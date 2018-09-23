const path = require('path')

module.exports = (options = {}, context) => ({
  define () {
    const { siteConfig = {}} = context
    const ga = options.ga || siteConfig.ga
    const GA_ID = ga || false
    return { GA_ID }
  },

  enhanceAppFiles: [
    path.resolve(__dirname, 'inject.js')
  ]
})
