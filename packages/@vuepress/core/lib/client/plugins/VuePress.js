import Vue from 'vue'
import Store from './Store'

// TODO: reuse this function in shared-utils
function cached (fn) {
  const cache = Object.create(null)
  return str => {
    if (typeof cache[str] === 'undefined') {
      cache[str] = fn(str)
    }
    return cache[str]
  }
}

const pascalize = cached((str = '') => str.replace(/(^|-)\w/g, s => s.slice(-1).toUpperCase()))

class VuePress extends Store {
  isPageExists (pageKey) {
    return Boolean(Vue.component(pascalize(pageKey)))
  }

  isLayoutExists (layout) {
    return Boolean(Vue.component(pascalize(layout)))
  }
}

export default {
  install (Vue) {
    const ins = new VuePress()
    Vue.$vuepress = ins
    Vue.prototype.$vuepress = ins
  }
}
