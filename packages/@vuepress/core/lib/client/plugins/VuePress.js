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

export default {
  install (Vue) {
    const vuepress = new Store()
    Vue.$vuepress = vuepress
    Vue.prototype.$vuepress = vuepress
    Vue.prototype.$hasComponent = key => Boolean(Vue.component(pascalize(key)))
  }
}
