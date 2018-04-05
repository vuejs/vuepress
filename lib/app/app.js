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
import { routes } from './.temp/siteData'

Vue.use(Router)

// mixin for exposing $site and $page
Vue.mixin(metadataMixin)

// component for rendering markdown content and setting title etc.
Vue.component('Content', Content)

// add now found route
routes.push({
  path: '*',
  component: NotFound
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
