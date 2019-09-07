/* global VUEPRESS_VERSION, LAST_COMMIT_HASH*/

import { createApp } from './app'

const { app, router } = createApp(false /* isServer */)

window.__VUEPRESS__ = {
  version: VUEPRESS_VERSION,
  hash: LAST_COMMIT_HASH
}

router.onReady(() => {
  app.$mount('#app')
})
