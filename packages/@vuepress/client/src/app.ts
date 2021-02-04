import { computed, h } from 'vue'
import type { CreateAppFunction, App, ComponentOptions } from 'vue'
import { createRouter, RouterView, START_LOCATION } from 'vue-router'
import type { Router, RouterHistory } from 'vue-router'
import { removeEndingSlash } from '@vuepress/shared'
import { clientAppEnhances } from '@internal/clientAppEnhances'
import { clientAppRootComponents } from '@internal/clientAppRootComponents'
import { clientAppSetups } from '@internal/clientAppSetups'
import { pagesComponent } from '@internal/pagesComponent'
import { pagesRoutes } from '@internal/pagesRoutes'
import {
  siteData,
  pageData,
  resolvePageData,
  pageFrontmatterSymbol,
  resolvePageFrontmatter,
  pageHeadSymbol,
  resolvePageHead,
  pageHeadTitleSymbol,
  resolvePageHeadTitle,
  pageLangSymbol,
  resolvePageLang,
  routeLocaleSymbol,
  resolveRouteLocale,
  themeDataSymbol,
  resolveThemeData,
  themeLocaleDataSymbol,
  resolveThemeLocaleData,
  siteLocaleDataSymbol,
  resolveSiteLocaleData,
  useUpdateHead,
} from './injections'
import { Content, OutboundLink } from './components'
import { withBase } from './utils'

export type AppCreator = CreateAppFunction<Element>
export type HistoryCreator = (base?: string) => RouterHistory
export type CreateVueAppResult = {
  app: App
  router: Router
}

/**
 * Create a vue app
 *
 * Accepting different app creator and history creator, so it
 * can be reused for both client side and server side
 */
export const createVueApp = async ({
  appCreator,
  historyCreator,
}: {
  appCreator: AppCreator
  historyCreator: HistoryCreator
}): Promise<CreateVueAppResult> => {
  // options to create vue app
  const appOptions: ComponentOptions = {
    setup() {
      // auto update head
      useUpdateHead()

      // invoke all clientAppSetups
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup()
      }

      return () => [
        h(RouterView),
        ...clientAppRootComponents.map((comp) => h(comp)),
      ]
    },
  }

  // create vue app
  const app = appCreator(appOptions)

  // create vue-router
  const router = createRouter({
    // TODO: it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash(siteData.value.base)),
    routes: pagesRoutes,
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      if (to.hash) {
        return { el: to.hash }
      }

      return { top: 0 }
    },
  })

  // use vue-router
  app.use(router)

  router.beforeResolve(async (to, from) => {
    if (to.path !== from.path || from === START_LOCATION) {
      pageData.value = await resolvePageData(to.path)
    }
  })

  // create global computed
  const routeLocale = computed(() =>
    resolveRouteLocale(siteData.value.locales, router.currentRoute.value.path)
  )
  const siteLocaleData = computed(() =>
    resolveSiteLocaleData(siteData.value, routeLocale.value)
  )
  const themeData = computed(() => resolveThemeData(siteData.value))
  const themeLocaleData = computed(() =>
    resolveThemeLocaleData(siteLocaleData.value)
  )
  const pageFrontmatter = computed(() => resolvePageFrontmatter(pageData.value))
  const pageHeadTitle = computed(() =>
    resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  )
  const pageHead = computed(() =>
    resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  )
  const pageLang = computed(() => resolvePageLang(pageData.value))

  // provide global computed
  app.provide(routeLocaleSymbol, routeLocale)
  app.provide(siteLocaleDataSymbol, siteLocaleData)
  app.provide(themeDataSymbol, themeData)
  app.provide(themeLocaleDataSymbol, themeLocaleData)
  app.provide(pageFrontmatterSymbol, pageFrontmatter)
  app.provide(pageHeadTitleSymbol, pageHeadTitle)
  app.provide(pageHeadSymbol, pageHead)
  app.provide(pageLangSymbol, pageLang)

  // provide global data & helpers
  Object.defineProperties(app.config.globalProperties, {
    $routeLocale: {
      get() {
        return routeLocale.value
      },
    },
    $site: {
      get() {
        return siteData.value
      },
    },
    $siteLocale: {
      get() {
        return siteLocaleData.value
      },
    },
    $theme: {
      get() {
        return themeData.value
      },
    },
    $themeLocale: {
      get() {
        return themeLocaleData.value
      },
    },
    $page: {
      get() {
        return pageData.value
      },
    },
    $frontmatter: {
      get() {
        return pageFrontmatter.value
      },
    },
    $lang: {
      get() {
        return pageLang.value
      },
    },
    $headTitle: {
      get() {
        return pageHeadTitle.value
      },
    },
    $withBase: {
      get() {
        return withBase
      },
    },
  })

  // register built-in components
  /* eslint-disable vue/match-component-file-name */
  app.component(
    'ClientOnly',
    __SSR__ ? () => null : (_, ctx) => ctx.slots.default?.()
  )
  app.component('Content', Content)
  app.component('OutboundLink', OutboundLink)
  /* eslint-enable vue/match-component-file-name */

  // register all pages components
  Object.entries(pagesComponent).forEach(([name, component]) => {
    app.component(name, component)
  })

  // invoke all clientAppEnhances
  for (const clientAppEnhance of clientAppEnhances) {
    await clientAppEnhance({ app, router, siteData })
  }

  return {
    app,
    router,
  }
}
