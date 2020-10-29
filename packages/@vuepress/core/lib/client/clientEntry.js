/* global VUEPRESS_VERSION, LAST_COMMIT_HASH*/

import { createApp } from './app'

window.__VUEPRESS__ = {
  version: VUEPRESS_VERSION,
  hash: LAST_COMMIT_HASH
}

createApp(false /* isServer */).then(({ app, router }) => {
  router.onReady(() => {
    app.$mount('#app')
  })
})
