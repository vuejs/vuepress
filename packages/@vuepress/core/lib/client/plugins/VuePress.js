import Store from './Store'
import {
  isPageExists,
  getPageAsyncComponent,
  isLayoutExists,
  isLayoutLoaded,
  getLayoutAsyncComponent
} from '../util'

class VuePress extends Store {}

Object.assign(VuePress.prototype, {
  isPageExists,
  getPageAsyncComponent,
  isLayoutExists,
  isLayoutLoaded,
  getLayoutAsyncComponent
})

export default {
  install (Vue) {
    const ins = new VuePress()
    Vue.$vuepress = ins
    Vue.prototype.$vuepress = ins
  }
}
