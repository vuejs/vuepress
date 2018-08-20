const { env: { isProduction }} = require('@vuepress/shared-utils')
const { webpack: { createCSSRule }} = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  chainWebpack (config, isServer) {
    const isProd = isProduction()
    const { postcss, stylus } = context.siteConfig
    createCSSRule({
      config,
      isProd,
      isServer,
      postcss,
      lang: 'stylus',
      test: /\.styl(us)?$/,
      loader: 'stylus-loader',
      options: Object.assign({
        preferPathResolver: 'webpack'
      }, stylus)
    })
  }
})
