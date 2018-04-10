module.exports = async function dev (sourceDir, cliOptions = {}) {
  const fs = require('fs')
  const path = require('path')
  const chalk = require('chalk')
  const webpack = require('webpack')
  const chokidar = require('chokidar')
  const serve = require('webpack-serve')
  const convert = require('koa-connect')
  const serveStatic = require('koa-static')
  const HTMLPlugin = require('html-webpack-plugin')
  const history = require('connect-history-api-fallback')

  const prepare = require('./prepare')
  const HeadPlugin = require('./webpack/HeadPlugin')
  const createClientConfig = require('./webpack/createClientConfig')
  const { applyUserWebpackConfig } = require('./util')
  const { frontmatterEmitter } = require('./webpack/markdownLoader')

  const options = await prepare(sourceDir)

  // setup watchers to update options and dynamically generated files
  const update = () => prepare(sourceDir).catch(err => {
    console.error(chalk.red(err.stack))
  })

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
    .use(HTMLPlugin, [
      { template: path.resolve(__dirname, 'app/index.dev.html') }
    ])

  config
    .plugin('site-data')
    .use(HeadPlugin, [options.siteConfig.head || []])

  config = config.toConfig()
  const userConfig = options.siteConfig.configureWebpack
  if (userConfig) {
    config = applyUserWebpackConfig(userConfig, config, false /* isServer */)
  }

  const compiler = webpack(config)
  const port = cliOptions.port || options.siteConfig.port || 8080

  let isFirst = true
  compiler.hooks.done.tap('vuepress', () => {
    if (isFirst) {
      isFirst = false
      console.log(
        `\n  VuePress dev server listening at ${
          chalk.cyan(`http://localhost:${port}`)
        }\n`
      )
    } else {
      const time = new Date().toTimeString().match(/^[\d:]+/)[0]
      console.log(`  ${chalk.gray(`[${time}]`)} ${chalk.green('✔')} successfully compiled.`)
    }
  })

  await serve({
    compiler,
    dev: { logLevel: 'error' },
    hot: { logLevel: 'error' },
    logLevel: 'error',
    port,
    add: app => {
      const userPublic = path.resolve(sourceDir, '.vuepress/public')
      if (fs.existsSync(userPublic)) {
        app.use(serveStatic(userPublic))
      }

      app.use(convert(history({
        rewrites: [
          { from: /\.html$/, to: '/' }
        ]
      })))
    }
  })
}
