import { pathToComponentName } from './util'

export default {
  functional: true,

  props: {
    custom: {
      type: Boolean,
      default: true
    }
  },

  render (h, { parent, props }) {
    return h(pathToComponentName(parent.$page.path), {
      class: props.custom ? 'custom' : ''
    })
  }
}
