import type { WebpackOptionsNormalized } from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { WebpackBundlerOptions } from '../types'

export const createDevServerConfig = (
  app: App,
  options: WebpackBundlerOptions
): WebpackDevServer.Configuration => {
  // TODO: add types for webpack-dev-server 4
  const serverConfig: WebpackOptionsNormalized['devServer'] = {
    compress: true,
    dev: {
      publicPath: app.options.base,
      writeToDisk: false,
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
      // plugin hook: beforeDevServer
      options.beforeDevServer?.(expressApp, server)
    },
    open: app.options.open,
    overlay: false,
    port: app.options.port,
    static: {
      directory: app.dir.public(),
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
