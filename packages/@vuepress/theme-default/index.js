const path = require('path')

// Theme API.
module.exports = {
  layout: path.resolve(__dirname, 'src/Layout.vue'),
  404: path.resolve(__dirname, 'src/NotFound.vue'),
  chainWebpack (config, isServer) {

  },
  plugins: []
}
