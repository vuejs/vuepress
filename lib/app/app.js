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
      const page = this.$site.pages[this.$route.path]
      page.frontmatter = page.frontmatter || {}
      return page
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
