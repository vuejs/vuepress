const EnhanceAppFilesOption = require('./EnhanceAppFilesOption')
const ClientDynamicModulesOption = require('./ClientDynamicModulesOption')
const GlobalUIComponentsOption = require('./GlobalUIComponentsOption')
const DefineOption = require('./DefineOption')
const AliasOption = require('./AliasOption')
const AsyncOption = require('../abstract/AsyncOption')
const AdditionalPagesOption = require('./AdditionalPagesOption')
const Option = require('../abstract/Option')
const { PLUGIN_OPTION_MAP } = require('../constants')

module.exports = function instantiateOption (option) {
  switch (option.name) {
  case PLUGIN_OPTION_MAP.ENHANCE_APP_FILES.name:
    return new EnhanceAppFilesOption(option.name)

  case PLUGIN_OPTION_MAP.CLIENT_DYNAMIC_MODULES.name:
    return new ClientDynamicModulesOption(option.name)

  case PLUGIN_OPTION_MAP.GLOBAL_UI_COMPONENTS.name:
    return new GlobalUIComponentsOption(option.name)

  case PLUGIN_OPTION_MAP.DEFINE.name:
    return new DefineOption(option.name)

  case PLUGIN_OPTION_MAP.ALIAS.name:
    return new AliasOption(option.name)

  case PLUGIN_OPTION_MAP.ADDITIONAL_PAGES.name:
    return new AdditionalPagesOption(name)

  default: return option.async ? new AsyncOption(option.name) : new Option(option.name)
  }
}
