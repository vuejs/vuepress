import Vue from 'vue'

export default class Store {
  constructor () {
    this.store = new Vue({
      data: {
        ob: {}
      }
    })
  }

  get (key) {
    return this.store.ob[key]
  }

  set (key, value) {
    Vue.set(this.store.ob, key, value)
  }
}
