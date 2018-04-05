module.exports = async function serve (sourceDir) {
  const path = require('path')
  const chalk = require('chalk')
  const prepare = require('./prepare')
  const webpack = require('webpack')
  const serve = require('webpack-serve')
  const HTMLPlugin = require('html-webpack-plugin')
  const convert = require('koa-connect')
  const history = require('connect-history-api-fallback')
  const createClientConfig = require('./webpack/clientConfig')
  const SiteDataPlugin = require('./webpack/SiteDataPlugin')

  const options = await prepare(sourceDir)

  const _config = createClientConfig(options)

  _config
    .plugin('html')
    .use(HTMLPlugin, [
      { template: path.resolve(__dirname, 'app/index.dev.html') }
    ])

  _config
    .plugin('site-data')
    .use(SiteDataPlugin, [options.siteData, options.siteConfig.head])

  const config = _config.toConfig()
  const compiler = webpack(config)
  const port = options.siteConfig.port || 8080

  let isFirst = true
  compiler.hooks.done.tap('vuepress', () => {
    if (isFirst) {
      isFirst = false
      console.log(
        `\n  VuePress dev server listening at ${
          chalk.cyan(`http://localhost:${port}`)
        }\n`
      )
    }
  })

  await serve({
    compiler,
    dev: { logLevel: 'error' },
    hot: { logLevel: 'error' },
    logLevel: 'error',
    port,
    add: app => app.use(convert(history({
      rewrites: [
        { from: /\.html$/, to: '/' }
      ]
    })))
  })
}
