const { env: { isProduction }} = require('@vuepress/shared-utils')
const { webpack: { createCSSRule }} = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  chainWebpack (config, isServer) {
    const isProd = isProduction()
    const { postcss, scss, sass } = context.siteConfig

    createCSSRule({
      config,
      isProd,
      isServer,
      postcssOptions: postcss,
      lang: 'scss',
      test: /\.scss$/,
      loader: 'sass-loader',
      options: scss
    })

    createCSSRule({
      config,
      isProd,
      isServer,
      postcssOptions: postcss,
      lang: 'sass',
      test: /\.sass/,
      loader: 'sass-loader',
      options: Object.assign({ indentedSyntax: true }, sass)
    })
  }
})
