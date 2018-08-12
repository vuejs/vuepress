const path = require('path')

module.exports = (options = {}, context) => ({
  name: 'google-analytics',

  ready () {
    const { siteConfig = {}} = context
    const ga = options.ga || siteConfig.ga
    context.GA_ID = ga ? JSON.stringify(ga) : false
  },

  chainWebpack (config) {
    config.plugin('injections').tap(([options]) => [
      Object.assign(options, {
        GA_ID: context.GA_ID
      })
    ])
  },

  enhanceAppFiles: [
    path.resolve(__dirname, 'inject.js')
  ]
})
