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
    const loadedPages = new Set()

    // add path of current page as initial value
    loadedPages.add(router.currentRoute.value.path)

    // set nprogress config
    nprogress.configure({ showSpinner: false })

    // show progress bar before navigation
    router.beforeEach((to, from, next) => {
      if (!loadedPages.has(to.path)) {
        nprogress.start()
      }
      next()
    })

    // hide progress bar after navigation
    router.afterEach((to) => {
      loadedPages.add(to.path)
      nprogress.done()
    })
  })
}

export default clientAppSetup
