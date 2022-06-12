const { path } = require('@vuepress/shared-utils')

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = (options = {}, context) => ({
  define () {
    const { siteConfig = {}} = context
    const ga = options.ga || siteConfig.ga
    const gm = options.gm || siteConfig.gm
    const GA_ID = ga || false
    // GM_ID is the Google Analytics ID for GA4
    const GM_ID = gm || false
    return { GA_ID, GM_ID }
  },

  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js'),
    path.resolve(__dirname, 'enhanceAppFileV4.js')
  ]
})
