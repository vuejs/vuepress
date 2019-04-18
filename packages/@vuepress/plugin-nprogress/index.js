const { resolve } = require('path')

module.exports = {
  clientRootMixin: resolve(__dirname, 'clientRootMixin.js'),
  enhanceAppFiles: resolve(__dirname, 'enhanceAppFile.js')
}
