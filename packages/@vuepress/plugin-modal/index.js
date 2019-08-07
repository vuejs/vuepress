const { path } = require('@vuepress/shared-utils')

module.exports = (options) => ({
  alias: {
    '@Modal':
      path.resolve(__dirname, 'Modal.vue')
  }
})
