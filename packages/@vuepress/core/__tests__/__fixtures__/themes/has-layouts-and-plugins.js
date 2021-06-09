const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-has-layouts-and-plugins',
  layouts: {
    Layout: path.resolve(__dirname, '../layouts/Layout.vue'),
    404: path.resolve(__dirname, '../layouts/404.vue'),
  },
  plugins: [path.resolve(__dirname, '../plugins/obj.js')],
}
