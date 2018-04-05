module.exports = function createServerConfig (options) {
  const path = require('path')
  const WebpackBar = require('webpackbar')
  const createBaseConfig = require('./baseConfig')
  const nodeExternals = require('webpack-node-externals')
  const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

  const config = createBaseConfig(options)

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

  config
    .plugin('bar')
    .use(WebpackBar, [{
      name: 'Server',
      color: 'blue',
      compiledIn: false
    }])

  return config
}
