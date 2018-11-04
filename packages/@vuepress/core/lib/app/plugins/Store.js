import Vue from 'vue'

class Store {
  constructor () {
    this.store = new Vue({
      data: {
        state: {}
      }
    })
  }

  $get (key) {
    return this.store.state[key]
  }

  $set (key, value) {
    Vue.set(this.store.state, key, value)
  }

  $emit (...args) {
    this.store.$emit(...args)
  }

  $on (...args) {
    this.store.$on(...args)
  }
}

export default {
  install (Vue, options = '$store') {
    const store = new Store()
    Vue[options] = store
    Vue.prototype[options] = store
  }
}
