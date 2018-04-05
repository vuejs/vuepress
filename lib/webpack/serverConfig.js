module.exports = function createServerConfig (options) {
  const fs = require('fs')
  const path = require('path')
  const WebpackBar = require('webpackbar')
  const createBaseConfig = require('./baseConfig')
  const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
  const CopyPlugin = require('copy-webpack-plugin')

  const config = createBaseConfig(options)
  const { sourceDir, outDir } = options

  config
    .target('node')
    .externals([/^vue|vue-router$/])

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

  config
    .plugin('bar')
    .use(WebpackBar, [{
      name: 'Server',
      color: 'blue',
      compiledIn: false
    }])

  return config
}
