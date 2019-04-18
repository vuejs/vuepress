import Store from './Store'
import {
  getPageAsyncComponent,
  getLayoutAsyncComponent,
  getAsyncComponent,
  getVueComponent
} from '../util'

class VuePress extends Store {}

Object.assign(VuePress.prototype, {
  getPageAsyncComponent,
  getLayoutAsyncComponent,
  getAsyncComponent,
  getVueComponent
})

export default {
  install (Vue) {
    const ins = new VuePress()
    Vue.$vuepress = ins
    Vue.prototype.$vuepress = ins
  }
}
