const path = require('path')

module.exports = {
  name: 'test',
  multiple: false,
  alias: {
    test: 'alias',
  },
  define: {
    __TEST__: 'define',
  },
  chainWebpack: (config, isServer) => {
    config.resolve.alias.set('test2', 'chainWebpack')

    if (isServer === false) {
      config.optimization.splitChunks({
        maxInitialRequests: 5,
        cacheGroups: {
          1: {
            test: /[\\/]node_modules[\\/](vue|vue-router|@vue|@vuepress)[\\/]/,
            name: 'vendor.1',
            chunks: 'all',
          },
          0: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendor.0',
            chunks: 'all',
          },
        },
      })
    }
  },
  clientAppEnhanceFiles: [path.resolve(__dirname, './clientAppEnhance.ts')],
  clientAppSetupFiles: [path.resolve(__dirname, './clientAppSetup.ts')],
}
