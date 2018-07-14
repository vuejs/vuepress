export default {
  functional: true,

  props: {
    custom: {
      type: Boolean,
      default: true
    }
  },

  render (h, { parent, props, data }) {
    return h(parent.$page.key, {
      class: [props.custom ? 'custom' : '', data.class, data.staticClass],
      style: data.style
    })
  }
}
