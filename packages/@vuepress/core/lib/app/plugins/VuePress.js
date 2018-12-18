import Store from './Store'

class VuePress extends Store {}

export default {
  install (Vue) {
    const ins = new VuePress()
    Vue.$vuepress = ins
    Vue.prototype.$vuepress = ins
  }
}
