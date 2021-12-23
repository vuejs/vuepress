const { path } = require('@vuepress/shared-utils')

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = (options, context) => ({
  define: {
    SELECTOR: options.selector || '.theme-default-content :not(a) > img',
    OPTIONS: options.options
  },
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
})
