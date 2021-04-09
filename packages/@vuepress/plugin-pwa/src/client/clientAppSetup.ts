import mitt from 'mitt'
import { onMounted, provide } from 'vue'
import { defineClientAppSetup, withBase } from '@vuepress/client'
import { pwaEventSymbol } from './composables'
import type { PwaEvent } from './composables'

declare const __DEV__: boolean
declare const __SSR__: boolean
declare const __PWA_SW_FILENAME__: string

const swFilename = __PWA_SW_FILENAME__

export default defineClientAppSetup(() => {
  if (__DEV__ || __SSR__ || !swFilename) return

  const log = (...args: any[]): void =>
    console.log('[@vuepress/plugin-pwa]', ...args)

  // create event emitter and provide it
  const event: PwaEvent = mitt()
  provide(pwaEventSymbol, event)

  onMounted(async () => {
    // lazy load register-service-worker
    const { register } = await import('register-service-worker')

    // Register service worker
    register(withBase(swFilename), {
      ready(registration) {
        log('Service worker is active.')
        event.emit('ready', registration)
      },

      registered(registration) {
        log('Service worker has been registered.')
        event.emit('registered', registration)
      },

      cached(registration) {
        log('Content has been cached for offline use.')
        event.emit('cached', registration)
      },

      updatefound(registration) {
        log('New content is downloading.')
        event.emit('updatefound', registration)
      },

      updated(registration) {
        log('New content is available, please refresh.')
        event.emit('updated', registration)
      },

      offline() {
        log('No internet connection found. App is running in offline mode.')
        event.emit('offline')
      },

      error(err) {
        log('Error during service worker registration:', err)
        event.emit('error', err)
      },
    })
  })
})
