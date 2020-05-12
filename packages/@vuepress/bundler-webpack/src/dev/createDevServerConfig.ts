import * as fs from 'fs'
import * as path from 'path'
import * as WebpackDevServer from 'webpack-dev-server'
import { App } from '@vuepress/core'
import { normalizeSeparator } from '@vuepress/utils'

export const createDevServerConfig = (
  app: App
): WebpackDevServer.Configuration => {
  // TODO: extract to public plugin
  const contentBase = app.dir.source('.vuepress/public')

  const serverConfig: WebpackDevServer.Configuration = {
    disableHostCheck: true,
    inline: true,
    compress: true,
    clientLogLevel: app.env.isDebug ? 'debug' : 'error',
    noInfo: !app.env.isDebug,
    hot: true,
    // quiet: true,
    stats: 'minimal',
    overlay: false,
    open: app.options.open,
    writeToDisk: false,
    host: app.options.host,
    publicPath: app.options.base,
    contentBase,
    headers: {
      'access-control-allow-origin': '*',
    },
    watchOptions: {
      ignored: [
        // Do not watch node_modules
        'node_modules',
        // Always watch temp dir
        `!${normalizeSeparator(app.dir.temp())}/**`,
      ],
    },
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /./, to: path.posix.join(app.options.base, 'index.html') },
      ],
    },
    before: async (expressApp, server): Promise<void> => {
      if (fs.existsSync(contentBase)) {
        expressApp.use(app.options.base, require('express').static(contentBase))
      }

      // apply plugin option: beforeDevServer
      await app.pluginApi.applyOption('beforeDevServer', expressApp, server)
    },
    after: async (expressApp, server): Promise<void> => {
      // apply plugin option: afterDevServer
      await app.pluginApi.applyOption('afterDevServer', expressApp, server)
    },
  }

  return serverConfig
}
