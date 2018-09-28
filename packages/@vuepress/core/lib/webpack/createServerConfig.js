'use strict'

/**
 * Expose createServerConfig method.
 */

module.exports = function createServerConfig (ctx) {
  const fs = require('fs')
  const { path } = require('@vuepress/shared-utils')
  const WebpackBar = require('webpackbar')
  const createBaseConfig = require('./createBaseConfig')
  const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
  const CopyPlugin = require('copy-webpack-plugin')

  const config = createBaseConfig(ctx, true /* isServer */)
  const { sourceDir, outDir } = ctx

  config
    .target('node')
    .externals([/^vue|vue-router$/])
    .devtool('source-map')

  // no need to minimize server build
  config.optimization.minimize(false)

  config
    .entry('app')
      .add(path.resolve(__dirname, '../app/serverEntry.js'))

  config.output
    .filename('server-bundle.js')
    .libraryTarget('commonjs2')

  config
    .plugin('ssr-server')
    .use(VueSSRServerPlugin, [{
      filename: 'manifest/server.json'
    }])

  const publicDir = path.resolve(sourceDir, '.vuepress/public')
  if (fs.existsSync(publicDir)) {
    config
      .plugin('copy')
      .use(CopyPlugin, [[
        { from: publicDir, to: outDir }
      ]])
  }

  if (!ctx.cliOptions.debug) {
    config
      .plugin('bar')
      .use(WebpackBar, [{
        name: 'Server',
        color: 'blue',
        compiledIn: false
      }])
  }

  if (ctx.siteConfig.chainWebpack) {
    ctx.siteConfig.chainWebpack(config, true /* isServer */)
  }

  ctx.pluginAPI.options.chainWebpack.syncApply(config, true /* isServer */)

  return config
}
