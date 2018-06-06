const EnhanceAppFilesOption = require('./EnhanceAppFilesOption')
const ExtendPageDataOption = require('./ExtendPageDataOption')
const DynamicClientCodeOption = require('./DynamicClientCodeOption')
const Tapable = require('../core/Tapable')

module.exports = function instantiateOption (name) {
  switch (name) {
  case 'enhanceAppFiles':
    return new EnhanceAppFilesOption(name)
  case 'extendPageData':
    return new ExtendPageDataOption(name)
  case 'dynamicClientCode':
    return new DynamicClientCodeOption(name)

  default: return new Tapable(name)
  }
}
