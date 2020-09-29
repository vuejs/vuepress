import { h } from 'vue'
import type { CreateAppFunction, App, ComponentOptions } from 'vue'
import { createRouter, RouterView } from 'vue-router'
import type { Router, RouterHistory } from 'vue-router'
import { removeEndingSlash } from '@vuepress/shared'
import { clientAppEnhances } from '@internal/clientAppEnhances'
import { clientAppSetups } from '@internal/clientAppSetups'
import { pageComponents } from '@internal/pageComponents'
import { routes } from '@internal/routes'
import { siteData } from './injections'
import { Content, Debug } from './components'

export type AppCreator = CreateAppFunction<Element>
export type HistoryCreator = (base?: string) => RouterHistory
export type CreateVueAppResult = {
  app: App
  router: Router
}

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
      // invoke all clientAppSetups
      for (const clientAppSetup of clientAppSetups) {
        clientAppSetup()
      }

      return () =>
        h('div', { id: 'app' }, [
          h(RouterView),
          // TODO: global ui, portal?
          h('div', { class: 'global-ui' }),
        ])
    },
  }

  // create vue app
  const app = appCreator(appOptions)

  // create vue-router
  const router = createRouter({
    // TODO: it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash(siteData.value.base)),
    routes,
  })

  // use vue-router
  app.use(router)

  // register built-in components
  app.component('Content', Content)
  app.component('Debug', __DEV__ ? Debug : () => null)

  // register all pages components
  Object.entries(pageComponents).forEach(([name, component]) => {
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
