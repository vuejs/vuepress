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
  const { chalk, logger } = require('@vuepress/shared-utils')
  const HeadPlugin = require('./webpack/HeadPlugin')
  const DevLogPlugin = require('./webpack/DevLogPlugin')
  const createClientConfig = require('./webpack/createClientConfig')
  const { applyUserWebpackConfig } = require('./util/index')
  const { frontmatterEmitter } = require('@vuepress/markdown-loader')

  const ctx = context || await prepare(sourceDir, cliOptions, false /* isProd */)

  // setup watchers to update options and dynamically generated files
  const update = (reason) => {
    logger.debug(`Re-prepare due to ${chalk.cyan(reason)}`)
    ctx.pluginAPI.options.updated.syncApply()
    prepare(sourceDir, cliOptions, false /* isProd */).catch(err => {
      console.error(logger.error(chalk.red(err.stack), false))
    })
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
  pagesWatcher.on('add', () => update('add page'))
  pagesWatcher.on('unlink', () => update('unlink page'))
  pagesWatcher.on('addDir', () => update('addDir'))
  pagesWatcher.on('unlinkDir', () => update('unlinkDir'))

  // watch config file
  const configWatcher = chokidar.watch([
    '.vuepress/config.js',
    '.vuepress/config.yml',
    '.vuepress/config.toml'
  ], {
    cwd: sourceDir,
    ignoreInitial: true
  })
  configWatcher.on('change', () => update('config change'))

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
  process.stdin &&
  process.stdin.on('data', chunk => {
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
      ignored: /node_modules/
    },
    historyApiFallback: {
      rewrites: [
        { from: /\.html$/, to: '/' }
      ]
    },
    overlay: false,
    host,
    contentBase: path.resolve(sourceDir, '.vuepress/public'),
    before (app, server) {
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
