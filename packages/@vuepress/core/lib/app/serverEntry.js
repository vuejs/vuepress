import Vue from 'vue'
import { createApp } from './app'
import pageComponents from '@internal/page-components'
import layoutComponents from '@internal/layout-components'

export default context => new Promise((resolve, reject) => {
  const { app, router } = createApp(true /* isServer */)
  const { url } = context
  const { fullPath } = router.resolve(url).route

  if (fullPath !== url) {
    return reject({ url: fullPath })
  }

  router.push(url)

  // In SSR, if a component is not registered with the component option,
  // vue-server-renderer will not able to resolve it.
  //
  // Build also works after deleting this, but the content of all pages
  // will not appear to the output html, which is not conducive to SEO.
  const asyncComponentLoadingPromises = [
    ...getComponentArr(pageComponents),
    ...getComponentArr(layoutComponents)
  ].map(({ name, loadFn }) => {
    return loadFn().then(comp => {
      Vue.component(name, comp.default)
    })
  })

  router.onReady(() => {
    Promise.all(asyncComponentLoadingPromises).then(() => resolve(app))
  })
})

function getComponentArr (components) {
  return Object.keys(components).map(name => ({ name, loadFn: components[name] }))
}
