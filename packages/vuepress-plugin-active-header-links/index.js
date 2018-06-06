const path = require('path')

module.exports = (options, context) => ({
  name: 'active-header-links',
  // This mixin will be applied to the root component of each page.
  clientRootMixin: path.resolve(__dirname, 'mixin.js')
})
