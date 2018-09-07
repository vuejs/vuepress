import Vue from 'vue'
import components from '@internal/page-components'

export default {
  functional: true,

  props: {
    pageKey: String,
    slot: String
  },

  render (h, { parent, props, data }) {
    const pageKey = props.pageKey || parent.$page.key

    if (components[pageKey]) {
      // In SSR, if a component is not registered with the component option
      // vue-server-renderer will not be able to resovle it.
      if (!parent.$ssrContext) {
        Vue.component(pageKey, components[pageKey])
      }

      return h(pageKey, {
        class: [data.class, data.staticClass],
        style: data.style,
        props: {
          slotKey: props.slot || 'default'
        }
      })
    }
    return h('')
  }
}
