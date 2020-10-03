/* global VUEPRESS_TEMP_PATH */
import Vue from 'vue'
import Router from 'vue-router'
import dataMixin from './dataMixin'
import { routes } from '@internal/routes'
import { siteData } from '@internal/siteData'
import appEnhancers from '@internal/app-enhancers'
import globalUIComponents from '@internal/global-ui'
import ClientComputedMixin from '@transform/ClientComputedMixin'
import VuePress from './plugins/VuePress'
import { handleRedirectForCleanUrls } from './redirect.js'
import { getLayoutAsyncComponent } from './util'

// built-in components
import Content from './components/Content.js'
import ContentSlotsDistributor from './components/ContentSlotsDistributor'
import OutboundLink from './components/OutboundLink.vue'
import ClientOnly from './components/ClientOnly'

// suggest dev server restart on base change
if (module.hot) {
  const prevBase = siteData.base
  module.hot.accept(VUEPRESS_TEMP_PATH + '/internal/siteData.js', () => {
    if (siteData.base !== prevBase) {
      window.alert(
        `[vuepress] Site base has changed. `
        + `Please restart dev server to ensure correct asset paths.`
      )
    }
  })
}

Vue.config.productionTip = false

Vue.use(Router)
Vue.use(VuePress)
// mixin for exposing $site and $page
Vue.mixin(dataMixin(ClientComputedMixin, siteData))
// component for rendering markdown content and setting title etc.

/* eslint-disable vue/match-component-file-name */
Vue.component('Content', Content)
Vue.component('ContentSlotsDistributor', ContentSlotsDistributor)
Vue.component('OutboundLink', OutboundLink)
// component for client-only content
Vue.component('ClientOnly', ClientOnly)
// core components
Vue.component('Layout', getLayoutAsyncComponent('Layout'))
Vue.component('NotFound', getLayoutAsyncComponent('NotFound'))
/* eslint-disable-next-line vue/match-component-file-name */

// global helper for adding base path to absolute urls
Vue.prototype.$withBase = function (path) {
  const base = this.$site.base
  if (path.charAt(0) === '/') {
    return base + path.slice(1)
  } else {
    return path
  }
}

export async function createApp (isServer) {
  const routerBase = typeof window !== 'undefined' && window.__VUEPRESS_ROUTER_BASE__
    ? window.__VUEPRESS_ROUTER_BASE__
    : (siteData.routerBase || siteData.base)

  const router = new Router({
    base: routerBase,
    mode: 'history',
    fallback: false,
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else if (to.hash) {
        if (Vue.$vuepress.$get('disableScrollBehavior')) {
          return false
        }
        return {
          selector: decodeURIComponent(to.hash)
        }
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

  handleRedirectForCleanUrls(router)

  const options = {}

  try {
    await Promise.all(
      appEnhancers
        .filter(enhancer => typeof enhancer === 'function')
        .map(enhancer => enhancer({ Vue, options, router, siteData, isServer }))
    )
  } catch (e) {
    console.error(e)
  }

  const app = new Vue(
    Object.assign(options, {
      router,
      render (h) {
        return h('div', { attrs: { id: 'app' }}, [
          h('RouterView', { ref: 'layout' }),
          h('div', { class: 'global-ui' }, globalUIComponents.map(component => h(component)))
        ])
      }
    })
  )

  return { app, router }
}
