'use strict'

/**
 * Expose createServerConfig method.
 */

module.exports = function createServerConfig (ctx) {
  const { env } = require('@vuepress/shared-utils')
  const createBaseConfig = require('./createBaseConfig')
  const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

  const config = createBaseConfig(ctx, true /* isServer */)

  config
    .target('node')
    .externals([/^vue|vue-router$/])
    .devtool('source-map')

  // no need to minimize server build
  config.optimization.minimize(false)

  config
    .entry('app')
      .add(ctx.getLibFilePath('client/serverEntry.js'))

  config.output
    .filename('server-bundle.js')
    .libraryTarget('commonjs2')

  config
    .plugin('ssr-server')
    .use(VueSSRServerPlugin, [{
      filename: 'manifest/server.json'
    }])

  if (!env.isDebug) {
    const WebpackBar = require('webpackbar')
    config
      .plugin('bar')
      .use(WebpackBar, [{
        name: 'Server',
        color: 'blue',
        compiledIn: false
      }])
  }

  ctx.pluginAPI.applySyncOption('chainWebpack', config, true /* isServer */)

  return config
}
