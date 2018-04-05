import Vue from 'vue'
import Router from 'vue-router'
import Content from './Content'
import NotFound from '~notFound'

// .temp/siteData.js is a dynamically generated file that:
// 1. registers all *.md pages and *.vue files found in _components as global
//    async components;
// 2. exports siteData
// 3. exports routes
import { siteData, routes } from './.temp/siteData'

routes.push({
  path: '*',
  component: NotFound
})

Vue.use(Router)

// component for rendering markdown content and setting title etc.
Vue.component('Content', Content)

Vue.mixin({
  computed: {
    $site () {
      return siteData
    },
    $page () {
      const pages = siteData.pages
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        if (page.path === this.$route.path) {
          page.frontmatter = page.frontmatter || {}
          return page
        }
      }
    }
  }
})

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
