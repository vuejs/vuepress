import * as nprogress from 'nprogress'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import '../styles/vars.css'
import '../styles/nprogress.css'

export const useNprogress = (): void => {
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
    router.beforeEach((to) => {
      if (!loadedPages.has(to.path)) {
        nprogress.start()
      }
    })

    // hide progress bar after navigation
    router.afterEach((to) => {
      loadedPages.add(to.path)
      nprogress.done()
    })
  })
}
