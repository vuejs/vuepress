import { sep } from 'path'
import type { WebpackOptionsNormalized } from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { WebpackBundlerOptions } from '../types'
import { trailingSlashMiddleware } from './trailingSlashMiddleware'

export const createDevServerConfig = (
  app: App,
  options: WebpackBundlerOptions
): WebpackDevServer.Configuration => {
  // TODO: add types for webpack-dev-server 4
  const serverConfig: WebpackOptionsNormalized['devServer'] = {
    client: {
      overlay: false,
    },
    compress: true,
    dev: {
      publicPath: app.options.base,
      writeToDisk: false,
      stats: app.env.isDebug ? 'normal' : 'errors-warnings',
    },
    firewall: false,
    headers: {
      'access-control-allow-origin': '*',
    },
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [{ from: /./, to: path.join(app.options.base, 'index.html') }],
    },
    host: app.options.host,
    hot: true,
    onAfterSetupMiddleware: (expressApp, server) => {
      // plugin hook: afterDevServer
      options.afterDevServer?.(expressApp, server)
    },
    onBeforeSetupMiddleware: (expressApp, server) => {
      // use trailing slash middleware to support vuepress routing in dev-server
      // it will be handled by most of the deployment platforms
      expressApp.use(trailingSlashMiddleware)

      // plugin hook: beforeDevServer
      options.beforeDevServer?.(expressApp, server)
    },
    open: app.options.open,
    port: app.options.port,
    static: {
      // `static.directory` will fail on Windows if we do not replace / with \
      directory: app.dir.public().replace('/', sep),
      publicPath: app.options.base,
      watch: {
        ignoreInitial: true,
        ignored: [
          // Do not watch node_modules
          'node_modules',
        ],
      },
    },
  }

  return serverConfig
}
