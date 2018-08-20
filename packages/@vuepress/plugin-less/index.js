const { env: { isProduction }} = require('@vuepress/shared-utils')
const { webpack: { createCSSRule }} = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  chainWebpack (config, isServer) {
    const isProd = isProduction()
    const { postcss, less } = context.siteConfig

    createCSSRule({
      config,
      isProd,
      isServer,
      postcssOptions: postcss,
      lang: 'less',
      test: /\.less/,
      loader: 'less-loader',
      options: less
    })
  }
})
