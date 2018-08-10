const path = require('path')
const themePlugin = require('./plugin')
const activeHeaderLinksPlugin = require('@vuepress/plugin-active-header-links')

// Theme API.
module.exports = {
  layout: path.resolve(__dirname, 'src/Layout.vue'),
  notFound: path.resolve(__dirname, 'src/NotFound.vue'),
  plugins: [
    themePlugin,
    activeHeaderLinksPlugin
  ]
}
