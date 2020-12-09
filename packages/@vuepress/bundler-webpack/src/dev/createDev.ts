import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import type { App, BundlerDev } from '@vuepress/core'
import { chalk, logger, ora } from '@vuepress/utils'
import type { WebpackBundlerOptions } from '../types'
import { resolveWebpackConfig } from '../utils'
import { createDevConfig } from './createDevConfig'
import { createDevServerConfig } from './createDevServerConfig'
import { resolvePort } from './resolvePort'

export const createDev = (options: WebpackBundlerOptions): BundlerDev => async (
  app: App
) => {
  // initialize and prepare
  logger.info('Initializing VuePress and preparing data...')
  await app.init()
  await app.prepare()

  // resolve host and port
  const host = app.options.host
  const port = await resolvePort(app.options.port)
  const url = `http://${host}:${port}${app.options.base}`

  // create webpack config
  const config = createDevConfig(app, options)
  const webpackConfig = resolveWebpackConfig({
    app,
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

    // start spinner before the first compilation
    compiler.hooks.beforeCompile.tap('vuepress-dev', () => {
      if (hasStarted) return
      hasStarted = true

      spinner.start('Compiling with webpack...')
    })

    // stop spinner and reject error if the first compilation is failed
    compiler.hooks.failed.tap('vuepress-dev', (err) => {
      if (hasFinished) return
      hasFinished = true

      spinner.fail('Compilation failed')
      reject(err)
    })

    // stop spinner and resolve dev-server after first compilation
    compiler.hooks.done.tap('vuepress-dev', ({ endTime, startTime }) => {
      if (hasFinished) return
      hasFinished = true

      spinner.succeed(`Compilation finished in ${endTime! - startTime!}ms`)

      server.listen(port, host, (err) => {
        if (err) {
          logger.error(`VuePress dev server failed to start`)
          return reject(err)
        }

        logger.success(`VuePress dev server is listening at ${chalk.cyan(url)}`)

        // promisify the close function
        const close = (): Promise<void> =>
          new Promise((resolve) => server.close(resolve))

        // resolve the close function
        resolve(close)
      })
    })
  })
}
