const EnhanceAppFilesOption = require('./EnhanceAppFilesOption')
const ExtendPageDataOption = require('./ExtendPageDataOption')
const ClientDynamicModulesOption = require('./ClientDynamicModulesOption')
const AdditionalPagesOption = require('./AdditionalPagesOption')
const GlobalUIComponentsOption = require('./GlobalUIComponentsOption')
const Tapable = require('../core/Tapable')
const { OPTION } = require('../constants')

module.exports = function instantiateOption (name) {
  switch (name) {
  case OPTION.ENHANCE_APP_FILES:
    return new EnhanceAppFilesOption(name)

  case OPTION.EXTEND_PAGE_DATA:
    return new ExtendPageDataOption(name)

  case OPTION.CLIENT_DYNAMIC_MODULES:
    return new ClientDynamicModulesOption(name)

  case OPTION.ADDITIONAL_PAGES:
    return new AdditionalPagesOption(name)

  case OPTION.GLOBAL_UI_COMPONENTS:
    return new GlobalUIComponentsOption(name)

  default: return new Tapable(name)
  }
}
