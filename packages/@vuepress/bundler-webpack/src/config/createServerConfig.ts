import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'
import { createBaseConfig } from './base'

export const createServerConfig = (app: App): Config => {
  const config = createBaseConfig(app)

  // server entry
  config.entry('app').add(app.dir.client('lib/server.js'))

  // set target to node
  config.target('node')

  // set externals
  // TODO
  config.externals([/(^(vue|vue-router)$)|(^@vue\/[^/]*$)/])

  // devtool
  // TODO: differences from client config, remove?
  config.devtool('source-map')

  // do not need to minimize server bundle
  config.optimization.minimize(false)

  // TODO

  // apply plugin option: chainWebpack
  app.pluginApi.applyOption('chainWebpack', config, true)

  return config
}
