import type { WebpackOptionsNormalized } from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import { App } from '@vuepress/core'
import { fs, path } from '@vuepress/utils'
import type { WebpackBundlerOptions } from '../types'

export const createDevServerConfig = (
  app: App,
  options: WebpackBundlerOptions
): WebpackDevServer.Configuration => {
  const contentBase = app.dir.public()

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
      rewrites: [
        { from: /./, to: path.posix.join(app.options.base, 'index.html') },
      ],
    },
    host: app.options.host,
    hot: true,
    onAfterSetupMiddleware: (expressApp, server) => {
      // plugin hook: afterDevServer
      options.afterDevServer?.(expressApp, server)
    },
    onBeforeSetupMiddleware: (expressApp, server) => {
      if (fs.pathExistsSync(contentBase)) {
        expressApp.use(app.options.base, require('express').static(contentBase))
      }

      // plugin hook: beforeDevServer
      options.beforeDevServer?.(expressApp, server)
    },
    open: app.options.open,
    overlay: false,
    port: app.options.port,
    static: {
      directory: contentBase,
      publicPath: app.options.base,
      watch: {
        ignoreInitial: true,
        ignored: [
          // Do not watch node_modules
          'node_modules',
          // Always watch temp dir
          `!${app.dir.temp()}/**`,
          // Always watch vuepress dir
          `!${app.dir.source('.vuepress')}/**`,
        ],
      },
    },
  }

  return serverConfig
}
