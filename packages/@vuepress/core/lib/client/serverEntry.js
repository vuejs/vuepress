import { createApp } from './app'

export default context => new Promise((resolve, reject) => {
  createApp(true /* isServer */).then(({ app, router }) => {
    const meta = app.$meta()
    const { url } = context
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // error handled in onReady
    router.push(url).catch(() => {})

    context.meta = meta
    router.onReady(() => resolve(app), reject)
  })
})
