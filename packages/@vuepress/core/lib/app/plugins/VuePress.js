import Vue from 'vue'
import Store from './Store'
import pageComponents from '@internal/page-components'

class VuePress extends Store {
  isPageExists (pageKey) {
    return Boolean(pageComponents[pageKey])
  }

  isPageLoaded (pageKey) {
    return Boolean(Vue.component(pageKey))
  }

  getPageAsyncComponent (pageKey) {
    if (!this.isPageExists(pageKey)) {
      throw new Error(`Cannot found ${pageKey}`)
    }
    return pageComponents[pageKey]
  }

  loadPageAsyncComponent (pageKey) {
    return this.getPageAsyncComponent(pageKey)()
  }

  registerPageAsyncComponent (pageKey) {
    Vue.component(pageKey, this.getPageAsyncComponent(pageKey))
  }
}

export default {
  install (Vue) {
    const ins = new VuePress()
    Vue.$vuepress = ins
    Vue.prototype.$vuepress = ins
  }
}
