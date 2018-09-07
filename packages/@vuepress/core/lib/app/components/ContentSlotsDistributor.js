export default {
  functional: true,

  render (h, { props, slots }) {
    return h('div', {
      class: 'content'
    }, slots()[props.target])
  }
}
