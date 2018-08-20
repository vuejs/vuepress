/**
 * Create CSS processing pipeline
 * @param {object} config instance of webpack-chain
 * @param {boolean} isServer
 * @param {boolean} isProd
 * @param {string} lang
 * @param {regexp} test
 * @param {string} loader loaders' name
 * @param {object} options loaders' options
 * @param {object} postcssOptions
 */
exports.createCSSRule = function ({
  config,
  isServer,
  isProd,
  lang,
  test,
  loader,
  options,
  postcssOptions
}) {
  const CSSExtractPlugin = require('mini-css-extract-plugin')
  const baseRule = config.module.rule(lang).test(test)
  const modulesRule = baseRule.oneOf('modules').resourceQuery(/module/)
  const normalRule = baseRule.oneOf('normal')

  applyLoaders(modulesRule, true)
  applyLoaders(normalRule, false)

  function applyLoaders (rule, modules) {
    if (!isServer) {
      if (isProd) {
        rule.use('extract-css-loader').loader(CSSExtractPlugin.loader)
      } else {
        rule.use('vue-style-loader').loader('vue-style-loader')
      }
    }

    rule.use('css-loader')
      .loader(isServer ? 'css-loader/locals' : 'css-loader')
      .options({
        modules,
        localIdentName: `[local]_[hash:base64:8]`,
        importLoaders: 1,
        sourceMap: !isProd
      })

    rule.use('postcss-loader').loader('postcss-loader').options(Object.assign({
      plugins: [require('autoprefixer')],
      sourceMap: !isProd
    }, postcssOptions))

    if (loader) {
      rule.use(loader).loader(loader).options(options)
    }
  }
}
