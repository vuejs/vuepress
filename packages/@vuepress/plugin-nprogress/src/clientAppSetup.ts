import * as nprogress from 'nprogress'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { ClientAppSetup } from '@vuepress/client'

import '../styles/nprogress.css'

const clientAppSetup: ClientAppSetup = () => {
  onMounted(() => {
    // get vue-router instance
    const router = useRouter()

    // record which pages have been loaded
    const loadedPages = Object.create(null)

    // set nprogress config
    nprogress.configure({ showSpinner: false })

    // show progress bar before navigation
    router.beforeEach((to, from, next) => {
      if (!loadedPages[to.path]) {
        nprogress.start()
      }
      next()
    })

    // hide progress bar after navigation
    router.afterEach((to) => {
      loadedPages[to.path] = true
      nprogress.done()
    })
  })
}

export = clientAppSetup
