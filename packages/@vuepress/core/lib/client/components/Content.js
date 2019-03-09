import Vue from 'vue'
import { getPageAsyncComponent } from '../util'

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
    const pageComponent = getPageAsyncComponent(pageKey)
    if (pageComponent) {
      Vue.component(pageKey, pageComponent)
      return h(pageKey)
    }
    return h('')
  }
}
