module.exports = async function dev (sourceDir, cliOptions = {}) {
  const fs = require('fs')
  const path = require('path')
  const chalk = require('chalk')
  const webpack = require('webpack')
  const chokidar = require('chokidar')
  const serve = require('webpack-serve')
  const convert = require('koa-connect')
  const mount = require('koa-mount')
  const serveStatic = require('koa-static')
  const history = require('connect-history-api-fallback')
  const portfinder = require('portfinder')

  const prepare = require('./prepare')
  const HeadPlugin = require('./webpack/HeadPlugin')
  const createClientConfig = require('./webpack/createClientConfig')
  const { applyUserWebpackConfig } = require('./util')
  const { frontmatterEmitter } = require('./webpack/markdownLoader')

  process.stdout.write('Extracting site metadata...')
  const options = await prepare(sourceDir)

  // setup watchers to update options and dynamically generated files
  const update = () => {
    prepare(sourceDir).catch(err => {
      console.error(chalk.red(err.stack))
    })
  }

  // watch add/remove of files
  const pagesWatcher = chokidar.watch([
    path.join(sourceDir, '**/*.md'),
    path.join(sourceDir, '.vuepress/components/**/*.vue')
  ], {
    ignored: '.vuepress/**/*.md',
    ignoreInitial: true
  })
  pagesWatcher.on('add', update)
  pagesWatcher.on('unlink', update)
  pagesWatcher.on('addDir', update)
  pagesWatcher.on('unlinkDir', update)

  // watch config file
  const configWatcher = chokidar.watch([
    path.join(sourceDir, '.vuepress/config.js')
  ], { ignoreInitial: true })
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

  config = config.toConfig()
  const userConfig = options.siteConfig.configureWebpack
  if (userConfig) {
    config = applyUserWebpackConfig(userConfig, config, false /* isServer */)
  }

  const compiler = webpack(config)
  // webpack-serve hot updates doesn't work properly over 0.0.0.0 on Windows,
  // but localhost does not allow visiting over network :/
  const defaultHost = process.platform === 'win32' ? 'localhost' : '0.0.0.0'
  const host = cliOptions.host || options.siteConfig.host || defaultHost
  const displayHost = host === defaultHost && process.platform !== 'win32'
    ? 'localhost'
    : host
  portfinder.basePort = cliOptions.port || options.siteConfig.port || 8080
  const port = await portfinder.getPortPromise()

  let isFirst = true
  compiler.hooks.done.tap('vuepress', () => {
    if (isFirst) {
      isFirst = false
      console.log(
        `\n  VuePress dev server listening at ${
          chalk.cyan(`http://${displayHost}:${port}${options.publicPath}`)
        }\n`
      )
    } else {
      const time = new Date().toTimeString().match(/^[\d:]+/)[0]
      console.log(`  ${chalk.gray(`[${time}]`)} ${chalk.green('✔')} successfully compiled.`)
    }
  })

  const nonExistentDir = path.resolve(__dirname, 'non-existent')
  await serve({
    // avoid project cwd from being served. Otherwise if the user has index.html
    // in cwd it would break the server
    content: [nonExistentDir],
    compiler,
    host,
    dev: { logLevel: 'warn' },
    hot: { logLevel: 'error' },
    logLevel: 'error',
    port,
    add: app => {
      const userPublic = path.resolve(sourceDir, '.vuepress/public')
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
