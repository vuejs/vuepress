const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  define: {
    SELECTOR: options.selector || '.content img'
  },
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
