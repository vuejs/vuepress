import { createApp } from './app'

export default context => new Promise((resolve, reject) => {
  const { app, router } = createApp()
  const { url } = context
  const { fullPath } = router.resolve(url).route

  if (fullPath !== url) {
    return reject({ url: fullPath })
  }

  router.push(url)
  router.onReady(() => resolve(app))
})
