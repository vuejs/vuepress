import { CreateAppFunction, App, h, ComponentOptions } from 'vue'
import {
  createRouter,
  useRoute,
  Router,
  RouterView,
  RouterHistory,
} from 'vue-router'
import { pageComponents } from '@internal/pageComponents'
import { routes } from '@internal/routes'
import { siteData } from '@internal/siteData'
import { Content } from './components'
import { siteDataKey } from './injections'

export type AppCreator = CreateAppFunction<Element>
export type HistoryCreator = (base?: string) => RouterHistory

export async function createVueApp({
  appCreator,
  historyCreator,
}: {
  appCreator: AppCreator
  historyCreator: HistoryCreator
}): Promise<{
  app: App
  router: Router
}> {
  const appOptions: ComponentOptions = {
    setup() {
      const route = useRoute()
      return { route }
    },

    render() {
      return h('div', { id: 'app' }, [
        h(RouterView),
        // TODO: global ui, portal?
        h('div', { class: 'global-ui' }),
      ])
    },
  }

  const app = appCreator(appOptions)

  const history = historyCreator(siteData.base)

  const router = createRouter({
    history,
    routes,
  })

  app.use(router)
  app.component('Content', Content)

  Object.entries(pageComponents).forEach(([name, component]) => {
    app.component(name, component)
  })

  // provide siteData
  app.provide(siteDataKey, siteData)

  return {
    app,
    router,
  }
}
