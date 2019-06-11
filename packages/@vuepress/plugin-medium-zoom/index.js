const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  define: {
    SELECTOR: options.selector || '.theme-default-content img',
    OPTIONS: options.options
  },
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
