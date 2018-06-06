const path = require('path')

module.exports = (options, context) => ({
  name: 'active-header-links',

  client: path.resolve(__dirname, 'client.js'),

  // This file will be mixed into the root component of each page.
  clientRootMixin: path.resolve(__dirname, 'root-mixin.js')
})
