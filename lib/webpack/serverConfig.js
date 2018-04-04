module.exports = function createServerConfig (options) {
  const path = require('path')
  const createBaseConfig = require('./baseConfig')
  const nodeExternals = require('webpack-node-externals')
  const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

  const config = createBaseConfig(options)

  config
    .target('node')
    .externals(nodeExternals({
      whitelist: [/\.css$/, /\?vue&type=style/]
    }))

  config
    .entry('app')
      .add(path.resolve(__dirname, '../app/serverEntry.js'))

  config.output
    .filename('server-bundle.js')
    .libraryTarget('commonjs2')

  config
    .plugin('ssr-server')
    .use(VueSSRServerPlugin)

  return config
}
