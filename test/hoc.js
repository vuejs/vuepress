const Component = {
  props: ['name'],
  render (h) {
    return h('p', {
      class: ['component', this.name]
    }, this.name)
  }
}

// When the child component is a pure presentation component,
// we want to be able to display a sub-component with minimal info,
// rather than stubbing it directly.
export function mockComponent (name) {
  return {
    render (h) {
      return h(Component, { props: { name }})
    }
  }
}
