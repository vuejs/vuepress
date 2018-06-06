const path = require('path')

module.exports = (options, context) => ({
  name: 'active-header-links',
  // This file will be mixed into the root component of each page.
  mixin: path.resolve(__dirname, 'root-mixin.js')
})
