const themePlugin = require('./plugin')

// Theme API.
module.exports = {
  plugins: [
    themePlugin,
    '@vuepress/active-header-links',
    '@vuepress/search'
  ]
}
