const path = require('path')

module.exports = (options, context) => ({
  enable: context.isDev,
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
})
