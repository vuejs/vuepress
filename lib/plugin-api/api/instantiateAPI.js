const EnhanceAppFiles = require('./EnhanceAppFiles')
const ExtendPageData = require('./ExtendPageData')
const AbstractAPI = require('./AbstractAPI')

module.exports = function instantiateAPI (name) {
  switch (name) {
  case 'enhanceAppFiles':
    return new EnhanceAppFiles(name)
  case 'extendPageData':
    return new ExtendPageData(name)

  default: return new AbstractAPI(name)
  }
}
