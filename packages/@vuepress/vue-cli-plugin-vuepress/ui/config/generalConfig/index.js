const flattenDeep = require('lodash/flattenDeep')

const basic = require('./basic')
const markdown = require('./markdown')

module.exports = data => flattenDeep([
  basic(data),
  markdown(data)
])
