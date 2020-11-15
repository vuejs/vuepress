import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import type { App, BundlerDev } from '@vuepress/core'
import type { BundlerWebpackOptions } from '../types'
import { createDevConfig } from './createDevConfig'
import { createDevLogPlugin } from './createDevLogPlugin'
import { createDevServerConfig } from './createDevServerConfig'
import { resolvePort } from './resolvePort'

export const createDev = (options: BundlerWebpackOptions): BundlerDev => async (
  app: App
) => {
  // initialize and prepare
  await app.init()
  await app.prepare()

  // resolve host and port
  const host = app.options.host
  const port = await resolvePort(app.options.port)

  // create webpack config
  const config = createDevConfig(app, options)
  const DevLogPlugin = createDevLogPlugin(
    `http://${host}:${port}${app.options.base}`
  )
  config.plugin('vuepress-dev-log').use(DevLogPlugin)
  const webpackConfig = config.toConfig()

  // create webpack compiler
  const compiler = webpack(webpackConfig)

  // create webpack-dev-server config
  const serverConfig = createDevServerConfig(app)

  // create webpack-dev-server
  const server = new WebpackDevServer(compiler, serverConfig)

  return new Promise((resolve, reject) => {
    compiler.hooks.done.tap('vuepress', () => {
      server.listen(port, host, (err) => {
        if (err) {
          reject(err)
        } else {
          // promisify the close function
          const close = (): Promise<void> =>
            new Promise((resolve) => server.close(resolve))

          // resolve the close function
          resolve(close)
        }
      })
    })
  })
}
