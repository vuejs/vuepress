/* global BASE_URL, GA_ID, ga, YM_ID, Ya SW_ENABLED */

import { createApp } from './app'
import { register } from 'register-service-worker'

const { app, router } = createApp()

// Google analytics integration
if (process.env.NODE_ENV === 'production' && GA_ID) {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }
    i[r].l = 1 * new Date()
    a = s.createElement(o)
    m = s.getElementsByTagName(o)[0]
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

  ga('create', GA_ID, 'auto')
  ga('send', 'pageview')

  router.afterEach(function (to) {
    ga('set', 'page', to.fullPath)
    ga('send', 'pageview')
  })
}

// Yandex.Metrica integration
if (process.env.NODE_ENV === 'production' && YM_ID) {
  (function (d, w, c) {
    (w[c] = w[c] || []).push(function () {
      try {
        w['yaCounter' + YM_ID] = new Ya.Metrika({
          id: YM_ID,
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          triggerEvent: true
        })
      } catch (e) { }
    })

    const n = d.getElementsByTagName('script')[0]
    const s = d.createElement('script')
    const f = function () { n.parentNode.insertBefore(s, n) }
    s.type = 'text/javascript'
    s.async = true
    s.src = 'https://mc.yandex.ru/metrika/watch.js'

    if (w.opera === '[object Opera]') {
      d.addEventListener('DOMContentLoaded', f, false)
    } else { f() }
  })(document, window, 'yandex_metrika_callbacks')

  document.addEventListener('yacounter' + YM_ID + 'inited', function () {
    router.afterEach(function (to) {
      window['yaCounter' + YM_ID].hit(to.fullPath)
    })
  })
}

router.onReady(() => {
  app.$mount('#app')

  // Register service worker
  if (process.env.NODE_ENV === 'production' &&
    SW_ENABLED &&
    window.location.protocol === 'https:') {
    register(`${BASE_URL}service-worker.js`, {
      ready () {
        console.log('[vuepress:sw] Service worker is active.')
        app.$refs.layout.$emit('sw-ready')
      },
      cached () {
        console.log('[vuepress:sw] Content has been cached for offline use.')
        app.$refs.layout.$emit('sw-cached')
      },
      updated () {
        console.log('[vuepress:sw] Content updated.')
        app.$refs.layout.$emit('sw-updated')
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
