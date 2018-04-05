module.exports = function createClientConfig (options, cliOptions) {
  const path = require('path')
  const WebpackBar = require('webpackbar')
  const createBaseConfig = require('./baseConfig')

  const config = createBaseConfig(options, cliOptions)

  config
    .entry('app')
      .add(path.resolve(__dirname, '../app/clientEntry.js'))

  config.node
    .merge({
      // prevent webpack from injecting useless setImmediate polyfill because Vue
      // source contains it (although only uses it if it's native).
      setImmediate: false,
      global: false,
      // process is injected via DefinePlugin, although some 3rd party
      // libraries may require a mock to work properly (#934)
      process: 'mock',
      // prevent webpack from injecting mocks to Node native modules
      // that does not make sense for the client
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    })

  // generate client manifest only during build
  if (process.env.NODE_ENV === 'production') {
    const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
    config
      .plugin('ssr-client')
      .use(VueSSRClientPlugin, [{
        filename: 'manifest/client.json'
      }])
  }

  config
    .plugin('bar')
    .use(WebpackBar, [{
      name: 'Client',
      color: '#41b883',
      compiledIn: false
    }])

  return config
}
