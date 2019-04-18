export default class SWUpdateEvent {
  constructor (registration) {
    Object.defineProperty(this, 'registration', {
      value: registration,
      configurable: true,
      writable: true
    })
  }

  /**
   * Check if the new service worker exists or not.
   */
  update () {
    return this.registration.update()
  }

  /**
   * Activate new service worker to work 'location.reload()' with new data.
   */
  skipWaiting () {
    const worker = this.registration.waiting
    if (!worker) {
      return Promise.resolve()
    }

    console.log('[vuepress:sw] Doing worker.skipWaiting().')
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel()

      channel.port1.onmessage = (event) => {
        console.log('[vuepress:sw] Done worker.skipWaiting().')
        if (event.data.error) {
          reject(event.data.error)
        } else {
          resolve(event.data)
        }
      }

      worker.postMessage({ type: 'skip-waiting' }, [channel.port2])
    })
  }
}

