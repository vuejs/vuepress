import { sep } from 'path'
import type { WebpackOptionsNormalized } from 'webpack'
import { App } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { WebpackBundlerOptions } from '../types'
import type { WebpackDevServer } from '../types.webpack-dev-server'
import { trailingSlashMiddleware } from './trailingSlashMiddleware'

export const createDevServerConfig = (
  app: App,
  options: WebpackBundlerOptions
): WebpackOptionsNormalized['devServer'] => ({
  compress: true,
  devMiddleware: {
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
  onAfterSetupMiddleware: (server: WebpackDevServer) => {
    options.afterDevServer?.(server)
  },
  onBeforeSetupMiddleware: (server: WebpackDevServer) => {
    // use trailing slash middleware to support vuepress routing in dev-server
    // it will be handled by most of the deployment platforms
    server.use(trailingSlashMiddleware)

    options.beforeDevServer?.(server)
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
})
