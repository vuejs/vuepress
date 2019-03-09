import Vue from 'vue'
import { isPageExists, getPageAsyncComponent } from '../util'

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
    if (isPageExists(pageKey)) {
      Vue.component(pageKey, getPageAsyncComponent(pageKey))
      return h(pageKey)
    }
    return h('')
  }
}
