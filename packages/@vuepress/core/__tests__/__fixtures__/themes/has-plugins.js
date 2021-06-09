const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-has-plugins',
  plugins: [path.resolve(__dirname, '../plugins/obj.js')],
}
