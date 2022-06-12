const { resolve } = require('path')

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = {
  clientRootMixin: resolve(__dirname, 'clientRootMixin.js'),
  enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.js')
}
