import Store from './Store'

class VuePress extends Store {

}

export default {
  install (Vue) {
    const store = new VuePress()
    Vue.$vuepress = store
    Vue.prototype.$vuepress = store
  }
}
