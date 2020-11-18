import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import type { App, BundlerDev } from '@vuepress/core'
import { chalk, logger, ora, withSpinner } from '@vuepress/utils'
import type { WebpackBundlerOptions } from '../types'
import { resolveWebpackConfig } from '../utils'
import { createDevConfig } from './createDevConfig'
import { createDevServerConfig } from './createDevServerConfig'
import { resolvePort } from './resolvePort'

export const createDev = (options: WebpackBundlerOptions): BundlerDev => async (
  app: App
) => {
  // initialize and prepare
  await withSpinner('Preparing data')(async () => {
    await app.init()
    await app.prepare()
  })

  // resolve host and port
  const host = app.options.host
  const port = await resolvePort(app.options.port)
  const url = `http://${host}:${port}${app.options.base}`

  // create webpack config
  const config = createDevConfig(app, options)
  const webpackConfig = resolveWebpackConfig({
    config,
    options,
    isServer: false,
    isBuild: false,
  })

  // create webpack compiler
  const compiler = webpack(webpackConfig)

  // create webpack-dev-server config
  const serverConfig = createDevServerConfig(app, options)

  // create webpack-dev-server
  const server = new WebpackDevServer(compiler, serverConfig)

  return new Promise((resolve, reject) => {
    const spinner = ora()

    let hasStarted = false
    let hasFinished = false

    compiler.hooks.beforeCompile.tap('vuepress-dev', () => {
      // start spinner before the first compilation
      if (!hasStarted) {
        hasStarted = true
        spinner.start('Compiling with webpack...')
      }
    })

    compiler.hooks.done.tap('vuepress-dev', ({ endTime, startTime }) => {
      // stop spinner and print log after the first compilation
      if (!hasFinished) {
        hasFinished = true
        spinner.succeed(`Compilation finished in ${endTime! - startTime!}ms`)

        server.listen(port, host, (err) => {
          if (err) {
            return reject(err)
          }

          logger.success(
            `VuePress dev server is listening at ${chalk.cyan(url)}`
          )

          // promisify the close function
          const close = (): Promise<void> =>
            new Promise((resolve) => server.close(resolve))

          // resolve the close function
          resolve(close)
        })
      }
    })
  })
}
