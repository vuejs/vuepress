const path = require('path')
const themePlugin = require('./plugin')

// Theme API.
module.exports = {
  layout: path.resolve(__dirname, 'src/Layout.vue'),
  notFound: path.resolve(__dirname, 'src/NotFound.vue'),
  plugins: [
    themePlugin,
    '@vuepress/active-header-links',
    '@vuepress/stylus'
  ]
}
