const { logger, fs, path } = require('@vuepress/shared-utils')

module.exports = ({
  serviceWorker = true,
  updatePopup = false,
  popupComponent = 'SWUpdatePopup',
  generateSWConfig = {}
}, context) => ({
  alias: {
    '@sw-event': path.resolve(__dirname, 'lib/event.js')
  },

  define () {
    const base = context.base || '/'
    return {
      SW_BASE_URL: base,
      SW_ENABLED: !!serviceWorker,
      SW_UPDATE_POPUP: updatePopup,
      SW_POPUP_COMPONENT: popupComponent
    }
  },

  globalUIComponents: updatePopup ? popupComponent : undefined,

  enhanceAppFiles: path.resolve(__dirname, 'lib/enhanceAppFile.js'),

  async generated () {
    const { outDir } = context
    const swFilePath = path.resolve(outDir, 'service-worker.js')
    if (serviceWorker) {
      logger.wait('Generating service worker...')
      const wbb = require('workbox-build')
      await wbb.generateSW({
        swDest: swFilePath,
        globDirectory: outDir,
        globPatterns: ['**\/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}'],
        ...generateSWConfig
      })
      await fs.writeFile(
        swFilePath,
        await fs.readFile(path.resolve(__dirname, 'lib/skip-waiting.js'), 'utf8'),
        { flag: 'a' }
      )
    }
  }
})
