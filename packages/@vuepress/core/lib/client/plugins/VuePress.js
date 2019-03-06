import Store from './Store'
import {
  isPageExists,
  isLayoutExists
} from '../util'

class VuePress extends Store {}

Object.assign(VuePress.prototype, {
  isPageExists,
  isLayoutExists
})

export default {
  install (Vue) {
    const ins = new VuePress()
    Vue.$vuepress = ins
    Vue.prototype.$vuepress = ins
  }
}
