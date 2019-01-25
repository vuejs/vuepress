import Vue from 'vue'
import { getLayoutAsyncComponent } from '../util'

Vue.component('Layout', getLayoutAsyncComponent('Layout'))
Vue.component('NotFound', getLayoutAsyncComponent('NotFound'))

export default {
  functional: true,

  render (h, { parent }) {
    if (parent.$page.path) {
      if (getLayoutAsyncComponent(parent.$page.frontmatter.layout)) {
        return h(parent.$page.frontmatter.layout)
      }
      return h('Layout')
    }
    return h('NotFound')
  }
}
