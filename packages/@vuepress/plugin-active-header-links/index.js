const path = require('path')

module.exports = (options, context) => ({
  name: 'active-header-links',
  enable: context.isDev,
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
})
