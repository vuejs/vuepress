/* global VUEPRESS_TEMP_PATH */
import Vue from 'vue'
import Router from 'vue-router'
import dataMixin from './dataMixin'
import { routes } from '@dynamic/routes'
import { siteData } from '@dynamic/siteData'
import appEnhancers from '@temp/app-enhancers.js'
import globalUIComponents from '@dynamic/global-ui.js'

// generated from user config
import('@temp/style.styl')

// built-in components
import Content from './components/Content'
import OutboundLink from './components/OutboundLink.vue'
import ClientOnly from './components/ClientOnly'

// suggest dev server restart on base change
if (module.hot) {
  const prevBase = siteData.base
  module.hot.accept(VUEPRESS_TEMP_PATH + '/dynamic/siteData.js', () => {
    if (siteData.base !== prevBase) {
      window.alert(
        `[vuepress] Site base has changed. ` +
        `Please restart dev server to ensure correct asset paths.`
      )
    }
  })
}

Vue.config.productionTip = false
Vue.use(Router)
// mixin for exposing $site and $page
Vue.mixin(dataMixin(siteData))
// component for rendering markdown content and setting title etc.
Vue.component('Content', Content)
Vue.component('OutboundLink', OutboundLink)
// component for client-only content
Vue.component('ClientOnly', ClientOnly)

// global helper for adding base path to absolute urls
Vue.prototype.$withBase = function (path) {
  const base = this.$site.base
  if (path.charAt(0) === '/') {
    return base + path.slice(1)
  } else {
    return path
  }
}

export function createApp (isServer) {
  const router = new Router({
    base: siteData.base,
    mode: 'history',
    fallback: false,
    routes,
    scrollBehavior: (to, from, saved) => {
      if (saved) {
        return saved
      } else if (to.hash) {
        if (Vue.$store.disableScrollBehavior) {
          return false
        }
        return {
          selector: to.hash
        }
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  // redirect /foo to /foo/
  router.beforeEach((to, from, next) => {
    if (!/(\/|\.html)$/.test(to.path)) {
      next(Object.assign({}, to, {
        path: to.path + '/'
      }))
    } else {
      next()
    }
  })

  const options = {}

  try {
    appEnhancers.forEach(enhancer => {
      if (typeof enhancer === 'function') {
        enhancer({ Vue, options, router, siteData, isServer })
      }
    })
  } catch (e) {
    console.error(e)
  }

  const app = new Vue(
    Object.assign(options, {
      router,
      render (h) {
        return h('div', { attrs: { id: 'app' }}, [
          h('router-view', { ref: 'layout' }),
          h('div', { class: 'global-ui' }, globalUIComponents.map(component => h(component)))
        ])
      }
    })
  )

  return { app, router }
}
