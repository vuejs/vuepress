module.exports = async function dev (sourceDir, cliOptions = {}) {
  const fs = require('fs')
  const path = require('path')
  const chalk = require('chalk')
  const webpack = require('webpack')
  const chokidar = require('chokidar')
  const serve = require('webpack-serve')
  const convert = require('koa-connect')
  const mount = require('koa-mount')
  const range = require('koa-range')
  const serveStatic = require('koa-static')
  const history = require('connect-history-api-fallback')

  const prepare = require('./prepare')
  const logger = require('./util/logger')
  const HeadPlugin = require('./webpack/HeadPlugin')
  const DevLogPlugin = require('./webpack/DevLogPlugin')
  const createClientConfig = require('./webpack/createClientConfig')
  const { applyUserWebpackConfig } = require('./util')
  const { frontmatterEmitter } = require('./webpack/markdownLoader')

  logger.wait('\nExtracting site metadata...')
  const options = await prepare(sourceDir)

  // setup watchers to update options and dynamically generated files
  const update = () => {
    prepare(sourceDir).catch(err => {
      console.error(logger.error(chalk.red(err.stack), false))
    })
  }

  // watch add/remove of files
  const pagesWatcher = chokidar.watch([
    '**/*.md',
    '.vuepress/components/**/*.vue'
  ], {
    cwd: sourceDir,
    ignored: '.vuepress/**/*.md',
    ignoreInitial: true
  })
  pagesWatcher.on('add', update)
  pagesWatcher.on('unlink', update)
  pagesWatcher.on('addDir', update)
  pagesWatcher.on('unlinkDir', update)

  // watch config file
  const configWatcher = chokidar.watch([
    '.vuepress/config.js',
    '.vuepress/config.yml',
    '.vuepress/config.toml'
  ], {
    cwd: sourceDir,
    ignoreInitial: true
  })
  configWatcher.on('change', update)

  // also listen for frontmatter changes from markdown files
  frontmatterEmitter.on('update', update)

  // resolve webpack config
  let config = createClientConfig(options, cliOptions)

  config
    .plugin('html')
    // using a fork of html-webpack-plugin to avoid it requiring webpack
    // internals from an incompatible version.
    .use(require('vuepress-html-webpack-plugin'), [{
      template: path.resolve(__dirname, 'app/index.dev.html')
    }])

  config
    .plugin('site-data')
    .use(HeadPlugin, [{
      tags: options.siteConfig.head || []
    }])

  const port = await resolvePort(cliOptions.port || options.siteConfig.port)
  const { host, displayHost } = await resolveHost(cliOptions.host || options.siteConfig.host)

  config
  .plugin('vuepress-log')
  .use(DevLogPlugin, [{
    port,
    displayHost,
    publicPath: options.publicPath
  }])

  config = config.toConfig()
  const userConfig = options.siteConfig.configureWebpack
  if (userConfig) {
    config = applyUserWebpackConfig(userConfig, config, false /* isServer */)
  }

  const compiler = webpack(config)

  const nonExistentDir = path.resolve(__dirname, 'non-existent')
  await serve({
    // avoid project cwd from being served. Otherwise if the user has index.html
    // in cwd it would break the server
    content: [nonExistentDir],
    compiler,
    host,
    dev: { logLevel: 'warn' },
    hot: {
      port: port + 1,
      logLevel: 'error'
    },
    logLevel: 'error',
    port,
    add: app => {
      const userPublic = path.resolve(sourceDir, '.vuepress/public')

      // enable range request
      app.use(range)

      // respect base when serving static files...
      if (fs.existsSync(userPublic)) {
        app.use(mount(options.publicPath, serveStatic(userPublic)))
      }

      app.use(convert(history({
        rewrites: [
          { from: /\.html$/, to: '/' }
        ]
      })))
    }
  })
}

function resolveHost (host) {
  // webpack-serve hot updates doesn't work properly over 0.0.0.0 on Windows,
  // but localhost does not allow visiting over network :/
  const defaultHost = process.platform === 'win32' ? 'localhost' : '0.0.0.0'
  host = host || defaultHost
  const displayHost = host === defaultHost && process.platform !== 'win32'
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
