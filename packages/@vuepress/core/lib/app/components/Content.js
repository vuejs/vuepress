export default {
  functional: true,

  props: {
    custom: {
      type: Boolean,
      default: true
    },
    pageKey: String
  },

  render (h, { parent, props, data }) {
    return h(props.pageKey || parent.$page.key, {
      class: [props.custom ? 'custom' : '', data.class, data.staticClass],
      style: data.style
    })
  }
}
