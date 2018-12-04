import Vue from 'vue'

export default {
  functional: true,
  props: {
    pageKey: String,
    slotKey: String
  },
  render (h, { parent, props, data }) {
    const pageKey = props.pageKey || parent.$page.key
    if (Vue.$vuepress.isPageExists(pageKey)) {
      // In SSR, if a component is not registered with the component option
      // vue-server-renderer will not be able to resovle it.
      if (!parent.$ssrContext) {
        Vue.$vuepress.registerPageAsyncComponent(pageKey)
      }

      return h(pageKey, {
        class: [data.class, data.staticClass],
        style: data.style,
        props: {
          slotKey: props.slotKey || 'default'
        }
      })
    }
    return h('')
  }
}
