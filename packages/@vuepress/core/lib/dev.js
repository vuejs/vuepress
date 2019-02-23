'use strict'

module.exports = async (sourceDir, cliOptions = {}, ctx) => {
  const { server, host, port } = await prepareServer(sourceDir, cliOptions, ctx)
  server.listen(port, host, err => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports.prepare = prepareServer

async function prepareServer (sourceDir, cliOptions = {}, context) {
  const WebpackDevServer = require('webpack-dev-server')
  const { path } = require('@vuepress/shared-utils')
  const webpack = require('webpack')
  const chokidar = require('chokidar')

  const prepare = require('./prepare/index')
  const { chalk, fs, logger } = require('@vuepress/shared-utils')
  const HeadPlugin = require('./webpack/HeadPlugin')
  const DevLogPlugin = require('./webpack/DevLogPlugin')
  const createClientConfig = require('./webpack/createClientConfig')
  const { applyUserWebpackConfig } = require('./util/index')
  const { frontmatterEmitter } = require('@vuepress/markdown-loader')

  const ctx = context || await prepare(sourceDir, cliOptions, false /* isProd */)

  // setup watchers to update options and dynamically generated files
  const update = (reason) => {
    console.log(`Reload due to ${reason}`)
    ctx.pluginAPI.options.updated.syncApply()
    prepare(sourceDir, cliOptions, false /* isProd */).catch(err => {
      console.error(logger.error(chalk.red(err.stack), false))
    })
  }

  // Curry update handler by update type
  const spawnUpdate = updateType => file => {
    const target = path.join(sourceDir, file)
    // Bust cache.
    delete require.cache[target]
    update(`${chalk.red(updateType)} ${chalk.cyan(file)}`)
  }

  // watch add/remove of files
  const pagesWatcher = chokidar.watch([
    '**/*.md',
    '.vuepress/components/**/*.vue'
  ], {
    cwd: sourceDir,
    ignored: ['.vuepress/**/*.md', 'node_modules'],
    ignoreInitial: true
  })
  pagesWatcher.on('add', spawnUpdate('add'))
  pagesWatcher.on('unlink', spawnUpdate('unlink'))
  pagesWatcher.on('addDir', spawnUpdate('addDir'))
  pagesWatcher.on('unlinkDir', spawnUpdate('unlinkDir'))

  const watchFiles = [
    '.vuepress/config.js',
    '.vuepress/config.yml',
    '.vuepress/config.toml'
  ].concat(
    (
      ctx.siteConfig.extraWatchFiles || []
    ).map(file => normalizeWatchFilePath(file, ctx.sourceDir))
  )

  logger.debug('watchFiles', watchFiles)

  // watch config file
  const configWatcher = chokidar.watch(watchFiles, {
    cwd: sourceDir,
    ignoreInitial: true
  })
  configWatcher.on('change', spawnUpdate('change'))

  // also listen for frontmatter changes from markdown files
  frontmatterEmitter.on('update', () => update('frontmatter or headers change'))

  // resolve webpack config
  let config = createClientConfig(ctx)

  config
    .plugin('html')
    // using a fork of html-webpack-plugin to avoid it requiring webpack
    // internals from an incompatible version.
    .use(require('vuepress-html-webpack-plugin'), [{
      template: ctx.devTemplate
    }])

  config
    .plugin('site-data')
    .use(HeadPlugin, [{
      tags: ctx.siteConfig.head || []
    }])

  const port = await resolvePort(cliOptions.port || ctx.siteConfig.port)
  const { host, displayHost } = await resolveHost(cliOptions.host || ctx.siteConfig.host)

  // debug in a running dev process.
  process.stdin
  && process.stdin.on('data', chunk => {
    const parsed = chunk.toString('utf-8').trim()
    if (parsed === '*') {
      console.log(Object.keys(ctx))
    }
    if (ctx[parsed]) {
      console.log(ctx[parsed])
    }
  })

  config
    .plugin('vuepress-log')
    .use(DevLogPlugin, [{
      port,
      displayHost,
      publicPath: ctx.base
    }])

  config = config.toConfig()
  const userConfig = ctx.siteConfig.configureWebpack
  if (userConfig) {
    config = applyUserWebpackConfig(userConfig, config, false /* isServer */)
  }

  const contentBase = path.resolve(sourceDir, '.vuepress/public')

  const serverConfig = Object.assign({
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'error',
    hot: true,
    quiet: true,
    headers: {
      'access-control-allow-origin': '*'
    },
    publicPath: ctx.base,
    watchOptions: {
      ignored: [
        /node_modules/,
        `!${ctx.tempPath}/**`
      ]
    },
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /./, to: path.posix.join(ctx.base, 'index.html') }
      ]
    },
    overlay: false,
    host,
    contentBase,
    before (app, server) {
      if (fs.existsSync(contentBase)) {
        app.use(ctx.base, require('express').static(contentBase))
      }

      ctx.pluginAPI.options.beforeDevServer.syncApply(app, server)
    },
    after (app, server) {
      ctx.pluginAPI.options.afterDevServer.syncApply(app, server)
    }
  }, ctx.siteConfig.devServer || {})

  WebpackDevServer.addDevServerEntrypoints(config, serverConfig)

  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, serverConfig)

  return {
    server,
    host,
    port,
    ctx
  }
}

function resolveHost (host) {
  const defaultHost = 'localhost'
  host = host || defaultHost
  const displayHost = host === defaultHost
    ? 'localhost'
    : host
  return {
    displayHost,
    host
  }
}

async function resolvePort (port) {
  const portfinder = require('portfinder')
  portfinder.basePort = parseInt(port) || 8080
  port = await portfinder.getPortPromise()
  return port
}

function normalizeWatchFilePath (filepath, baseDir) {
  const { isAbsolute, relative } = require('path')
  if (isAbsolute(filepath)) {
    return relative(baseDir, filepath)
  }
  return filepath
}
