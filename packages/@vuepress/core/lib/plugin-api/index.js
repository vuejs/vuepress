const chalk = require('chalk')
const logger = require('../util/logger')
const instantiateOption = require('./option/instantiateOption')
const { resolvePlugin, hydratePlugin, normalizePluginsConfig } = require('./util')
const { assertTypes } = require('../util/shared')
const { PLUGIN_OPTION_MAP } = require('./constants')

module.exports = class Plugin {
  constructor (context) {
    this.options = {}
    this._pluginContext = context
    this.initializeOptions(PLUGIN_OPTION_MAP)
  }

  use (pluginRaw, pluginOptions = {}) {
    let plugin = resolvePlugin(pluginRaw)
    if (!plugin.config) {
      console.warn(`[vuepress] cannot resolve plugin "${pluginRaw}"`)
      return
    }
    plugin = hydratePlugin(plugin, pluginOptions, this._pluginContext)
    if (plugin.enabled) {
      this.applyPlugin(plugin)
    } else {
      logger.debug(`\n${chalk.gray(`[${plugin.name}]`)} disabled.`)
    }
    return this
  }

  useByPluginsConfig (pluginsConfig) {
    pluginsConfig = normalizePluginsConfig(pluginsConfig)
    pluginsConfig.forEach(([pluginRaw, pluginOptions]) => {
      this.use(pluginRaw, pluginOptions)
    })
    return this
  }

  initializeOptions () {
    Object.keys(PLUGIN_OPTION_MAP).forEach(key => {
      const option = PLUGIN_OPTION_MAP[key]
      this.options[option.name] = instantiateOption(option.name)
    })
  }

  registerOption (key, value, pluginName) {
    const option = PLUGIN_OPTION_MAP[key]
    const types = option.types
    const { valid, warnMsg } = assertTypes(value, types)
    if (valid) {
      this.options[option.name].tap(pluginName, value)
    } else if (value !== undefined) {
      logger.warn(
        `${chalk.gray(`[vuepress-plugin-${pluginName}]`)} ` +
        `Invalid value for "option" ${chalk.cyan(option.name)}: ${warnMsg}`
      )
    }
    return this
  }

  applyPlugin ({
    name: pluginName,
    shortcut,
    chainWebpack,
    enhanceDevServer,
    extendMarkdown,
    enhanceAppFiles,
    outFiles,
    extendPageData,
    ready,
    compiled,
    updated,
    generated,
    clientDynamicModules,
    clientRootMixin,
    additionalPages,
    globalUIComponents
  }) {
    if (shortcut) {
      logger.tip(`\nApply plugin ${chalk.magenta(shortcut)} ${chalk.gray(`(i.e. "${pluginName}")`)} ...`)
    } else {
      logger.tip(`\nApply plugin ${chalk.magenta(pluginName)} ...`)
    }

    this
      .registerOption(PLUGIN_OPTION_MAP.READY.key, ready, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.COMPILED.key, compiled, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.UPDATED.key, updated, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.GENERATED.key, generated, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.CHAIN_WEBPACK.key, chainWebpack, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.ENHANCE_DEV_SERVER.key, enhanceDevServer, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.EXTEND_MARKDOWN.key, extendMarkdown, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.EXTEND_PAGE_DATA.key, extendPageData, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.ENHANCE_APP_FILES.key, enhanceAppFiles, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.OUT_FILES.key, outFiles, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.CLIENT_DYNAMIC_MODULES.key, clientDynamicModules, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.CLIENT_ROOT_MIXIN.key, clientRootMixin, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.ADDITIONAL_PAGES.key, additionalPages, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.GLOBAL_UI_COMPONENTS.key, globalUIComponents, pluginName)
  }
}
