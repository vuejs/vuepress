const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-extends-parent',
  extends: path.resolve(__dirname, './has-layouts-and-plugins'),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Foo.vue'),
    Foo: path.resolve(__dirname, '../layouts/Foo.vue'),
  },
  plugins: [path.resolve(__dirname, '../plugins/obj-foo.js')],
}
