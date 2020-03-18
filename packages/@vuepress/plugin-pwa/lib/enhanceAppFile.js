/* global SW_BASE_URL, SW_ENABLED, GA_ID, ga, SW_UPDATE_POPUP, SW_POPUP_COMPONENT */

import Vue from 'vue'
import SWUpdateEvent from './SWUpdateEvent'
import event from './event'

if (SW_UPDATE_POPUP && SW_POPUP_COMPONENT === 'SWUpdatePopup') {
  // eslint-disable-next-line vue/match-component-file-name
  Vue.component('SWUpdatePopup', () => import('./SWUpdatePopup.vue'))
}

export default async ({ router, isServer }) => {
  if (process.env.NODE_ENV === 'production' && !isServer && SW_ENABLED) {
    // register-service-worker@1.7.0 references `window` in outer scope, so we have to import it dynamically in client
    const { register } = await import('register-service-worker')

    // Register service worker
    router.onReady(() => {
      register(`${SW_BASE_URL}service-worker.js`, {
        registrationOptions: {},
        ready () {
          console.log('[vuepress:sw] Service worker is active.')
          event.$emit('sw-ready')
        },

        cached (registration) {
          console.log('[vuepress:sw] Content has been cached for offline use.')
          event.$emit('sw-cached', new SWUpdateEvent(registration))
        },

        updated (registration) {
          console.log('[vuepress:sw] Content updated.')
          event.$emit('sw-updated', new SWUpdateEvent(registration))
        },

        offline () {
          console.log('[vuepress:sw] No internet connection found. App is running in offline mode.')
          event.$emit('sw-offline')
        },

        error (err) {
          console.error('[vuepress:sw] Error during service worker registration:', err)
          event.$emit('sw-error', err)
          if (GA_ID) {
            ga('send', 'exception', {
              exDescription: err.message,
              exFatal: false
            })
          }
        }
      })
    })
  }
}
