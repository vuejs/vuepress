const { path } = require('@vuepress/utils')

module.exports = {
  name: 'theme-has-grandparent',
  extends: path.resolve(__dirname, './has-parent'),
  layouts: {
    404: path.resolve(__dirname, '../layouts/Bar.vue'),
    Bar: path.resolve(__dirname, '../layouts/Bar.vue'),
  },
}
