const flattenDeep = require('lodash/flattenDeep')

const basic = require('./basic')
const advanced = require('./advanced')
const browserCompatibility = require('./browserCompatibility')

module.exports = data => flattenDeep([
  basic(data),
  advanced(data),
  browserCompatibility(data)
])
