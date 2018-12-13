const EnhanceAppFilesOption = require('./EnhanceAppFilesOption')
const ClientDynamicModulesOption = require('./ClientDynamicModulesOption')
const GlobalUIComponentsOption = require('./GlobalUIComponentsOption')
const DefineOption = require('./DefineOption')
const AliasOption = require('./AliasOption')
const AsyncOption = require('../abstract/AsyncOption')
const Option = require('../abstract/Option')
const { PLUGIN_OPTION_MAP } = require('../constants')

module.exports = function instantiateOption ({ name, async }) {
  switch (name) {
  case PLUGIN_OPTION_MAP.ENHANCE_APP_FILES.name:
    return new EnhanceAppFilesOption(name)

  case PLUGIN_OPTION_MAP.CLIENT_DYNAMIC_MODULES.name:
    return new ClientDynamicModulesOption(name)

  case PLUGIN_OPTION_MAP.GLOBAL_UI_COMPONENTS.name:
    return new GlobalUIComponentsOption(name)

  case PLUGIN_OPTION_MAP.DEFINE.name:
    return new DefineOption(name)

  case PLUGIN_OPTION_MAP.ALIAS.name:
    return new AliasOption(name)

  default: return async ? new AsyncOption(name) : new Option(name)
  }
}
