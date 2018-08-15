const EnhanceAppFilesOption = require('./EnhanceAppFilesOption')
const ExtendPageDataOption = require('./ExtendPageDataOption')
const ClientDynamicModulesOption = require('./ClientDynamicModulesOption')
const AdditionalPagesOption = require('./AdditionalPagesOption')
const GlobalUIComponentsOption = require('./GlobalUIComponentsOption')
const Option = require('../Option')
const { PLUGIN_OPTION_MAP } = require('../constants')

module.exports = function instantiateOption (name) {
  switch (name) {
  case PLUGIN_OPTION_MAP.ENHANCE_APP_FILES.name:
    return new EnhanceAppFilesOption(name)

  case PLUGIN_OPTION_MAP.EXTEND_PAGE_DATA.name:
    return new ExtendPageDataOption(name)

  case PLUGIN_OPTION_MAP.CLIENT_DYNAMIC_MODULES.name:
    return new ClientDynamicModulesOption(name)

  case PLUGIN_OPTION_MAP.ADDITIONAL_PAGES.name:
    return new AdditionalPagesOption(name)

  case PLUGIN_OPTION_MAP.GLOBAL_UI_COMPONENTS.name:
    return new GlobalUIComponentsOption(name)

  default: return new Option(name)
  }
}
