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
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// expose Vue Press data
const g = typeof window !== 'undefined' ? window : global
const $site = Vue.prototype.$site = g.VUE_PRESS_DATA

Vue.mixin({
  computed: {
    $page () {
      return $site.pages[this.$route.path]
    }
  }
})

const app = new Vue({
  router,
  render: h => h(Layout)
})

export { app, router }
