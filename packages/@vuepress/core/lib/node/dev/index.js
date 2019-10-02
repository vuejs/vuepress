'use strict'

/**
 * Module dependencies.
 */

const EventEmitter = require('events').EventEmitter
const WebpackDevServer = require('webpack-dev-server')
const { frontmatterEmitter } = require('@vuepress/markdown-loader')
const webpack = require('webpack')
const chokidar = require('chokidar')

const { path, fs, logger } = require('@vuepress/shared-utils')
const HeadPlugin = require('../webpack/HeadPlugin')
const DevLogPlugin = require('../webpack/DevLogPlugin')
const createClientConfig = require('../webpack/createClientConfig')
const { applyUserWebpackConfig } = require('../util/index')

module.exports = class DevProcess extends EventEmitter {
  constructor (context) {
    super()
    this.context = context
  }

  /**
   * Prepare essential data for launch dev server.
   */

  async process () {
    this.context.resolveCacheLoaderOptions()
    this.watchSourceFiles()
    this.watchUserConfig()
    this.watchFrontmatter()
    this.setupDebugTip()
    await this.resolvePort()
    await this.resolveHost()
    this.prepareWebpackConfig()
    return this
  }

  /**
   * Hande file's update, need to re-prepare app context.
   *
   * @param {string} type
   * @param {string} target
   */

  handleUpdate (type, target) {
    logger.debug(type, target)
    if (!path.isAbsolute(target)) {
      target = path.join(this.context.sourceDir, target)
    }
    if (target.endsWith('.js')) {
      // Bust cache.
      delete require.cache[target]
    }
    this.emit('fileChanged', {
      type,
      target
    })
  }

  /**
   * Watch user's source document files.
   */

  watchSourceFiles () {
    // watch add/remove of files
    this.pagesWatcher = chokidar.watch([
      '**/*.md',
      '.vuepress/components/**/*.vue'
    ], {
      cwd: this.context.sourceDir,
      ignored: ['.vuepress/**/*.md', 'node_modules'],
      ignoreInitial: true
    })
    this.pagesWatcher.on('add', target => this.handleUpdate('add', target))
    this.pagesWatcher.on('unlink', target => this.handleUpdate('unlink', target))
  }

  /**
   * Watch user's config files and extra files.
   */

  watchUserConfig () {
    this.watchFiles = [
      '.vuepress/config.js',
      '.vuepress/config.yml',
      '.vuepress/config.toml'
    ].concat(
      (
        this.context.siteConfig.extraWatchFiles || []
      ).map(file => normalizeWatchFilePath(file, this.context.sourceDir))
    )

    logger.debug('watchFiles', this.watchFiles)

    this.configWatcher = chokidar.watch(this.watchFiles, {
      cwd: this.context.sourceDir,
      ignoreInitial: true
    })

    this.configWatcher.on('change', target => this.handleUpdate('change', target))
  }

  /**
   * Also listen for frontmatter changes from markdown files
   */

  watchFrontmatter () {
    frontmatterEmitter.on('update', target => this.handleUpdate('frontmatter', target))
  }

  /**
   * Resolve used port
   */

  async resolvePort () {
    this.port = await resolvePort(this.context.options.port || this.context.siteConfig.port)
  }

  /**
   * Resolve used host
   */

  async resolveHost () {
    const { host, displayHost } = await resolveHost(this.context.options.host || this.context.siteConfig.host)
    this.host = host
    this.displayHost = displayHost
  }

  /**
   * Set up a shortcut to debug context under dev.
   */

  setupDebugTip () {
    // debug in a running dev process.
    process.stdin
    && process.stdin.on('data', chunk => {
      const parsed = chunk.toString('utf-8').trim()
      if (parsed === '*') {
        console.log(Object.keys(this.context))
      }
      if (this.context[parsed]) {
        console.log(this.context[parsed])
      }
    })
  }

  /**
   * Prepare webpack for dev process.
   */

  prepareWebpackConfig () {
    // resolve webpack config
    let config = createClientConfig(this.context)

    config
      .plugin('html')
      // using a fork of html-webpack-plugin to avoid it requiring webpack
      // internals from an incompatible version.
      .use(require('vuepress-html-webpack-plugin'), [{
        template: this.context.devTemplate
      }])

    config
      .plugin('site-data')
      .use(HeadPlugin, [{
        tags: this.context.siteConfig.head || []
      }])

    config
      .plugin('vuepress-log')
      .use(DevLogPlugin, [{
        port: this.port,
        displayHost: this.displayHost,
        publicPath: this.context.base,
        clearScreen: this.context.options.clearScreen
      }])

    config = config.toConfig()
    const userConfig = this.context.siteConfig.configureWebpack
    if (userConfig) {
      config = applyUserWebpackConfig(userConfig, config, false /* isServer */)
    }
    this.webpackConfig = config
  }

  /**
   * Create dev server
   * @returns {module.DevProcess}
   */

  createServer () {
    const contentBase = path.resolve(this.context.sourceDir, '.vuepress/public')

    const serverConfig = Object.assign({
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'error',
      hot: true,
      quiet: true,
      headers: {
        'access-control-allow-origin': '*'
      },
      open: this.context.options.open,
      publicPath: this.context.base,
      watchOptions: {
        ignored: [
          /node_modules/,
          `!${this.context.tempPath}/**`
        ]
      },
      historyApiFallback: {
        disableDotRule: true,
        rewrites: [
          { from: /./, to: path.posix.join(this.context.base, 'index.html') }
        ]
      },
      overlay: false,
      host: this.host,
      contentBase,
      before: (app, server) => {
        if (fs.existsSync(contentBase)) {
          app.use(this.context.base, require('express').static(contentBase))
        }

        this.context.pluginAPI.applySyncOption('beforeDevServer', app, server)
      },
      after: (app, server) => {
        this.context.pluginAPI.applySyncOption('afterDevServer', app, server)
      }
    }, this.context.siteConfig.devServer || {})

    WebpackDevServer.addDevServerEntrypoints(this.webpackConfig, serverConfig)

    const compiler = webpack(this.webpackConfig)
    this.server = new WebpackDevServer(compiler, serverConfig)
    return this
  }

  /**
   * delegate listen call.
   *
   * @param callback handler when connection is ready.
   * @returns {module.DevProcess}
   */

  listen (callback) {
    this.server.listen(this.port, this.host, (err) => {
      if (typeof callback === 'function') {
        callback(err)
      }
    })
    return this
  }
}

/**
 * Resolve host.
 *
 * @param {string} host user's host
 * @returns {{displayHost: string, host: string}}
 */

function resolveHost (host) {
  const defaultHost = '0.0.0.0'
  host = host || defaultHost
  const displayHost = host === defaultHost
    ? 'localhost'
    : host
  return {
    displayHost,
    host
  }
}

/**
 * Resolve port.
 *
 * @param {number} port user's port
 * @returns {Promise<number>}
 */

async function resolvePort (port) {
  const portfinder = require('portfinder')
  portfinder.basePort = parseInt(port) || 8080
  port = await portfinder.getPortPromise()
  return port
}

/**
 * Normalize file path and always return relative path,
 *
 * @param {string} filepath user's path
 * @param {string} baseDir source directory
 * @returns {string}
 */

function normalizeWatchFilePath (filepath, baseDir) {
  const { isAbsolute, relative } = require('path')
  if (isAbsolute(filepath)) {
    return relative(baseDir, filepath)
  }
  return filepath
}
