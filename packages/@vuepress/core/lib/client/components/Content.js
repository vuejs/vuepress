import { setGlobalInfo } from '@app/util'

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

    if (pageKey) {
      return h(pageKey)
    }
    return h('')
  }
}
