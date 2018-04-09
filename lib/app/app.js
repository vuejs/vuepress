import Vue from 'vue'
import Router from 'vue-router'
import Content from './Content'
import NotFound from '~notFound'
import metadataMixin from './metadataMixin'

// .temp/siteData.js is a dynamically generated file that:
// 1. registers all *.md pages and *.vue files found in _components as global
//    async components;
// 2. exports siteData
// 3. exports routes
import { routes, siteData } from './.temp/siteData'

Vue.use(Router)

// mixin for exposing $site and $page
Vue.mixin(metadataMixin)

// component for rendering markdown content and setting title etc.
Vue.component('Content', Content)

// add 404 route
routes.push({
  path: '*',
  component: NotFound
})

export function createApp () {
  const router = new Router({
    base: siteData.base,
    mode: 'history',
    fallback: false,
    linkActiveClass: '',
    linkExactActiveClass: '',
    routes,
    scrollBehavior: (to, from, saved) => {
      if (saved) {
        return saved
      } else if (to.hash) {
        return { selector: to.hash }
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  const app = new Vue({
    router,
    render (h) {
      return h('div', { attrs: { id: 'app' }}, [
        h('router-view')
      ])
    }
  })

  return { ...{ app, router }}
}
