import Vue from 'vue'
import components from '@internal/page-components'

export default {
  functional: true,

  props: {
    custom: {
      type: Boolean,
      default: true
    },
    pageKey: String,
    slot: String
  },

  render (h, { parent, props, data }) {
    const pageKey = props.pageKey || parent.$page.key
    Vue.component(pageKey, components[pageKey])

    return h(pageKey, {
      class: [props.custom ? 'custom' : '', data.class, data.staticClass],
      style: data.style,
      slot: props.slot || 'default'
    })
  }
}
