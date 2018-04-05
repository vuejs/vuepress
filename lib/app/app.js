import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// register-commponents.js registers all *.vue files found in _components
// as global async components
import './.temp/register-components'

// routes are generated from md files
import routes from './.temp/routes'

// expose Vue Press data
const inBrowser = typeof window !== 'undefined'

Vue.mixin({
  computed: {
    $site () {
      return inBrowser ? window.VUEPRESS_DATA : this.$ssrContext.siteData
    },
    $page () {
      const path = this.$route.path
      const pageId = path === '/' ? path : path.replace(/(\/|\.html)$/, '')
      return this.$site.pages[pageId]
    }
  }
})

// component for rendering markdown content and setting title etc.
import Content from './Content'
Vue.component('Content', Content)

export function createApp () {
  const router = new Router({
    mode: 'history',
    fallback: false,
    routes
  })

  const app = new Vue({
    router,
    render (h) {
      return h('div', { attrs: { id: 'app' }}, [
        h('router-view')
      ])
    }
  })

  return { app, router }
}
