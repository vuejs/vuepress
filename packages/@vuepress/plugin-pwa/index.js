const path = require('path')

module.exports = (options, context) => ({
  chainWebpack (config) {
    options = Object.assign({
      serviceWorker: true
    }, options)

    const { serviceWorker, updatePopup } = options
    const base = context.base || '/'

    config.plugin('injections').tap(([options]) => [
      Object.assign(options, {
        SW_BASE_URL: JSON.stringify(base),
        SW_ENABLED: !!serviceWorker,
        SW_UPDATE_POPUP: updatePopup ? JSON.stringify(updatePopup) : false
      })
    ])
  },

  globalUIComponents: 'SWUpdatePopup',

  enhanceAppFiles: [
    path.resolve(__dirname, 'inject.js')
  ]
})
