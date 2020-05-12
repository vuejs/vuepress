import { HotModuleReplacementPlugin } from 'webpack'
import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'
import { createBaseConfig } from './base'

export const createClientConfig = (app: App): Config => {
  const config = createBaseConfig(app)

  // client entry
  config.entry('app').add(app.dir.client('lib/client.js'))

  if (app.env.isProd) {
    // TODO: extract-css
    // TODO: optimization.splitChunks
    // TODO: ssr client plugin
    // TODO: optimize assets
  }

  if (app.env.isDev) {
    // HMR plugin
    config.plugin('hmr').use(HotModuleReplacementPlugin)
  }

  // apply plugin option: chainWebpack
  app.pluginApi.applyOption('chainWebpack', config, false)

  return config
}
