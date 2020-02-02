import { createApp } from './app'

export default context => new Promise((resolve, reject) => {
  createApp(true /* isServer */).then(({ app, router }) => {
    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    router.push(url)
    router.onReady(() => resolve(app))
  })
})
