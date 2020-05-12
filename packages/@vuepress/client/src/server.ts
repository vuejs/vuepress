import { createSSRApp, App } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { createVueApp } from './createVueApp'

// TODO: move to a better place
type VuepressSSRContext = {
  url: string
  title: string
  lang: string
  description: string
  version: string
}

export default (context: VuepressSSRContext): Promise<App> =>
  new Promise((resolve, reject) => {
    createVueApp({
      appCreator: createSSRApp,
      historyCreator: createMemoryHistory,
    }).then(({ app, router }) => {
      const { url } = context
      const { fullPath } = router.resolve(url)

      if (fullPath !== url) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ url: fullPath })
      }

      router.push(url)
      router.isReady().then(() => resolve(app))
    })
  })
