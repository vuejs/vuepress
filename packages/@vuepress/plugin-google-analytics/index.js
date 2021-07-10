const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  define () {
    const { siteConfig = {}} = context
    const ga = options.ga || siteConfig.ga
    const GA_ID = ga || false
    const gaStorage = options.gaStorage || siteConfig.gaStorage
    const GA_STORAGE = gaStorage || false
    return { GA_ID, GA_STORAGE }
  },

  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
})
