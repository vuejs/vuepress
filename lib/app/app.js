import Vue from 'vue'
import Router from 'vue-router'
import Content from './Content'
import NotFound from '~notFound'
import dataMixin from './dataMixin'
import { routes } from './.temp/routes'
import { siteData } from './.temp/siteData'

// suggest dev server restart on base change
if (module.hot) {
  const prevBase = siteData.base
  module.hot.accept('./.temp/siteData', () => {
    if (siteData.base !== prevBase) {
      window.alert(
        `[vuepress] Site base has changed. ` +
        `Please restart dev server to ensure correct asset paths.`
      )
    }
  })
}

Vue.use(Router)

// mixin for exposing $site and $page
Vue.mixin(dataMixin)

// component for rendering markdown content and setting title etc.
Vue.component('Content', Content)

// global helper for adding base path to absolute urls
Vue.prototype.$withBase = function (path) {
  const base = this.$site.base
  if (path.charAt(0) === '/') {
    return base + path.slice(1)
  } else {
    return path
  }
}

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
