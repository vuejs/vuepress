export default {
  functional: true,
  render (h, { parent, children }) {
    if (parent._isMounted) {
      return children
    } else {
      parent.$once('hook:mounted', () => {
        parent.$forceUpdate()
      })
    }
  }
}
