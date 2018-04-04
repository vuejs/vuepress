import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// layout is resolved dynamically and set as an alias
import Layout from '~layout'

// dynamically generated files:

// register-commponents.js registers all *.vue files found in _components
// as global async components
import './.temp/register-components'

// routes are generated from md files
import routes from './.temp/routes'

const router = new Router({
  mode: 'history',
  routes
})

// expose Vue Press data
const g = typeof window !== 'undefined' ? window : global
const $site = Vue.prototype.$site = g.VUEPRESS_DATA

Vue.mixin({
  computed: {
    $page () {
      return $site.pages[this.$route.path]
    }
  }
})

Vue.component('Content', {
  functional: true,
  render (h, { parent }) {
    return h('page-' + parent.$page.name)
  }
})

const app = new Vue({
  router,
  render (h) {
    return h('router-view')
  }
})

export { app, router }
