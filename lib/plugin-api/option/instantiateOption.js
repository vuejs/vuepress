const EnhanceAppFilesOption = require('./EnhanceAppFilesOption')
const ExtendPageDataOption = require('./ExtendPageDataOption')
const DynamicClientModulesOption = require('./DynamicClientModulesOption')
const Tapable = require('../core/Tapable')

module.exports = function instantiateOption (name) {
  switch (name) {
  case 'enhanceAppFiles':
    return new EnhanceAppFilesOption(name)
  case 'extendPageData':
    return new ExtendPageDataOption(name)
  case 'dynamicClientModules':
    return new DynamicClientModulesOption(name)

  default: return new Tapable(name)
  }
}
