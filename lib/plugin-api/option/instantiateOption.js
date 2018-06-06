const EnhanceAppFilesOption = require('./EnhanceAppFilesOption')
const ExtendPageDataOption = require('./ExtendPageDataOption')
const ClientDynamicModulesOption = require('./ClientDynamicModulesOption')
const Tapable = require('../core/Tapable')

module.exports = function instantiateOption (name) {
  switch (name) {
  case 'enhanceAppFiles':
    return new EnhanceAppFilesOption(name)
  case 'extendPageData':
    return new ExtendPageDataOption(name)
  case 'clientDynamicModules':
    return new ClientDynamicModulesOption(name)

  default: return new Tapable(name)
  }
}
