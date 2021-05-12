const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-has-parent',
  extends: path.resolve(__dirname, './has-layouts'),
  layouts: {
    Foo: path.resolve(__dirname, '../layouts/Foo.vue'),
  },
}
