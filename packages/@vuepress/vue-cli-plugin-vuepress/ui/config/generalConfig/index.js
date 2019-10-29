const flattenDeep = require('lodash/flattenDeep')

const basic = require('./basic')

module.exports = data => flattenDeep([
  basic(data)
])
