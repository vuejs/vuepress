const path = require('path')
const { logger, fs } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  ready () {
    options = Object.assign({
      serviceWorker: true
    }, options)
  },

  chainWebpack (config) {
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

  // TODO support components option
  // components: [
  //   { name: 'SWUpdatePopup', path: path.resolve(__dirname, 'lib/SWUpdatePopup.vue') }
  // ],

  globalUIComponents: options.popupComponent || 'SWUpdatePopup',

  enhanceAppFiles: [path.resolve(__dirname, 'lib/inject.js')],

  async generated () {
    const { serviceWorker } = options
    const { outDir } = context
    const swFilePath = path.resolve(outDir, 'service-worker.js')
    if (serviceWorker) {
      logger.wait('\nGenerating service worker...')
      const wbb = require('workbox-build')
      await wbb.generateSW({
        swDest: swFilePath,
        globDirectory: outDir,
        globPatterns: ['**\/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}']
      })
      await fs.writeFile(
        swFilePath,
        await fs.readFile(path.resolve(__dirname, 'lib/skip-waiting.js'), 'utf8'),
        { flag: 'a' }
      )
    }
  }
})
