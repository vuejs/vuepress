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

  globalUIComponents: 'SWUpdatePopup',

  enhanceAppFiles: [path.resolve(__dirname, 'inject.js')],

  async generated () {
    const { serviceWorker } = options
    const { outDir } = context
    if (serviceWorker) {
      logger.wait('\nGenerating service worker...')
      const wbb = require('workbox-build')
      await wbb.generateSW({
        swDest: path.resolve(outDir, 'service-worker.js'),
        globDirectory: outDir,
        globPatterns: ['**\/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}']
      })
      await fs.writeFile(
        path.resolve(outDir, 'service-worker.js'),
        await fs.readFile(path.resolve(__dirname, 'skip-waiting.js'), 'utf8'),
        { flag: 'a' }
      )
    }
  }
})
