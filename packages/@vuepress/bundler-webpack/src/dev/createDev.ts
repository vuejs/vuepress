import type * as WebpackDevServer from 'webpack-dev-server'
import type { App, BundlerFunc } from '@vuepress/core'
import type { BundlerWebpackOptions } from '../createBundler'
import { createDevConfig } from './createDevConfig'
import { createDevServer } from './createDevServer'
import { createDevServerConfig } from './createDevServerConfig'
import { resolvePort } from './resolvePort'

export const createDev = (
  options: BundlerWebpackOptions
): BundlerFunc<WebpackDevServer> => async (
  app: App
): Promise<WebpackDevServer> => {
  // initialize app
  await app.init()

  // create webpack config
  const config = createDevConfig(app)
  const webpackConfig = config.toConfig()

  // create webpack-dev-server config
  const serverConfig = createDevServerConfig(app)

  // resolve host and port
  const host = app.options.host
  const port = await resolvePort(app.options.port)

  // prepare app
  await app.prepare()

  // TODO: watch
  // - config change: restart from app.init()
  // - page change: restart from app.prepare()
  // notice the different behaviors of "webpack watch" and "our watch"

  // create webpack-dev-server
  const server = createDevServer(webpackConfig, serverConfig)

  return new Promise((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(server)
      }
    })
  })
}
