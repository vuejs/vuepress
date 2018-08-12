/* global BASE_URL, GA_ID, ga, SW_ENABLED, VUEPRESS_VERSION, LAST_COMMIT_HASH*/

import { createApp } from './app'
import SWUpdateEvent from './SWUpdateEvent'
import { register } from 'register-service-worker'

const { app, router } = createApp()

window.__VUEPRESS_VERSION__ = {
  version: VUEPRESS_VERSION,
  hash: LAST_COMMIT_HASH
}

router.onReady(() => {
  app.$mount('#app')

  // TODO Separate it into a plugin ('vuepress-plugin-pwa')
  // Register service worker
  if (process.env.NODE_ENV === 'production' &&
    SW_ENABLED &&
    window.location.protocol === 'https:') {
    register(`${BASE_URL}service-worker.js`, {
      ready () {
        console.log('[vuepress:sw] Service worker is active.')
        app.$refs.layout.$emit('sw-ready')
      },
      cached (registration) {
        console.log('[vuepress:sw] Content has been cached for offline use.')
        app.$refs.layout.$emit('sw-cached', new SWUpdateEvent(registration))
      },
      updated (registration) {
        console.log('[vuepress:sw] Content updated.')
        app.$refs.layout.$emit('sw-updated', new SWUpdateEvent(registration))
      },
      offline () {
        console.log('[vuepress:sw] No internet connection found. App is running in offline mode.')
        app.$refs.layout.$emit('sw-offline')
      },
      error (err) {
        console.error('[vuepress:sw] Error during service worker registration:', err)
        app.$refs.layout.$emit('sw-error', err)
        if (GA_ID) {
          ga('send', 'exception', {
            exDescription: err.message,
            exFatal: false
          })
        }
      }
    })
  }
})
