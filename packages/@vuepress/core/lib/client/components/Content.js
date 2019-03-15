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
      return h(pageComponent)
    }
    return h('')
  }
}
