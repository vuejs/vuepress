const path = require('path')

module.exports = (options = {}, context) => ({

  define () {
    const { siteConfig = {}} = context
    const MATOMO_SITE_ID = options.siteId || siteConfig.siteId || false
    const MATOMO_TRACKER_URL = options.trackerUrl || siteConfig.trackerUrl || false
    const MATOMO_ENABLE_LINK_TRACKING = options.enableLinkTracking || siteConfig.enableLinkTracking || true
    return { MATOMO_SITE_ID, MATOMO_TRACKER_URL, MATOMO_ENABLE_LINK_TRACKING }
  },

  enhanceAppFiles: [
    path.resolve(__dirname, 'inject.js')
  ]
})
