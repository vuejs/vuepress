const themePlugin = require('./plugin')

// Theme API.
module.exports = {
  layout: 'src/Layout.vue',
  notFound: 'src/NotFound.vue',
  plugins: [
    themePlugin,
    '@vuepress/active-header-links'
  ]
}
