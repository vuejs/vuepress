const path = require('path')

module.exports = (options, context) => ({
  name: 'default-theme',

  chainWebpack (config, isServer) {
    const { themeConfig, siteConfig } = context

    // resolve algolia
    const isAlgoliaSearch = (
      themeConfig.algolia ||
      Object.keys(siteConfig.locales && themeConfig.locales || {})
        .some(base => themeConfig.locales[base].algolia)
    )

    config.resolve
      .alias
      .set('@default-theme', path.resolve('.'))
      .set('@AlgoliaSearchBox', isAlgoliaSearch
        ? path.resolve(__dirname, './src/AlgoliaSearchBox.vue')
        : path.resolve(__dirname, './noopModule.js'))
      .end()
  }
})
