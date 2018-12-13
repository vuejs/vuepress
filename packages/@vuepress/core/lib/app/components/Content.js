import Vue from 'vue'

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
    if (Vue.$vuepress.isPageExists(pageKey)) {
      // In SSR, if a component is not registered with the component option
      // vue-server-renderer will not be able to resovle it.
      if (!parent.$ssrContext) {
        Vue.$vuepress.registerPageAsyncComponent(pageKey)
      }

      return h(pageKey)
    }
    return h('')
  }
}
