export default {
  functional: true,
  props: {
    slotKey: String,
    required: true
  },
  render (h, { props, slots }) {
    return h('div',
      {
        class: [
          `content__${props.slotKey}`
        ]
      },
      slots()[props.slotKey]
    )
  }
}
