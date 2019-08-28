const compose = require('./compose')
const parseHeaders = require('./parseHeaders')
const removeNonCodeWrappedHTML = require('./removeNonCodeWrappedHTML')

module.exports = compose(
  removeNonCodeWrappedHTML,
  parseHeaders
)
