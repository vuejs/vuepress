import { App } from '@vuepress/core'
import { createDevConfig } from './createDevConfig'
import { createDevServer } from './createDevServer'
import { createDevServerConfig } from './createDevServerConfig'
import { resolvePort } from './resolvePort'

export const dev = async (app: App): Promise<void> => {
  // initialize app
  await app.init()

  // create webpack config
  const config = createDevConfig(app)
  const webpackConfig = config.toConfig()

  // create webpack-dev-server config
  const serverConfig = createDevServerConfig(app)

  // create webpack-dev-server
  const server = createDevServer(webpackConfig, serverConfig)

  // resolve host and port
  const host = app.options.host
  const port = await resolvePort(app.options.port)

  // prepare app
  await app.prepare()

  // TODO: watch
  // - config change: restart from app.init()
  // - page change: restart from app.prepare()
  // notice the different behaviors of "webpack watch" and "our watch"

  return new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
