const path = require('path')
const plugin = require('./plugin')

// Theme API.
module.exports = {
  layout: path.resolve(__dirname, 'src/Layout.vue'),
  notFound: path.resolve(__dirname, 'src/NotFound.vue'),
  plugins: [
    plugin
  ]
}
