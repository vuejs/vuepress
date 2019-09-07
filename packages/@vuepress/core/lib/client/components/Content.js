import Vue from 'vue'
import { setGlobalInfo, getPageAsyncComponent } from '@app/util'

export default {
  props: {
    pageKey: String,
    slotKey: {
      type: String,
      default: 'default'
    }
  },
  render (h) {
    const pageKey = this.pageKey || this.$parent.$page.key
    setGlobalInfo('pageKey', pageKey)

    /**
     * This is for use cases that render `<Content />`
     * with dynamic pageKey from current $page.
     */
    if (!Vue.component(pageKey)) {
      Vue.component(pageKey, getPageAsyncComponent(pageKey))
    }

    if (Vue.component(pageKey)) {
      return h(pageKey)
    }
    return h('')
  }
}
