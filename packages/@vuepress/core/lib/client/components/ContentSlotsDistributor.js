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
          'content',
          props.slotKey
        ]
      },
      slots()[props.slotKey]
    )
  }
}
