'use strict'

/**
 * Module dependencies.
 */

const instantiateOption = require('./override/instantiateOption')
const { flattenPlugin, normalizePluginsConfig } = require('./util')
const { PLUGIN_OPTION_MAP } = require('./constants')
const {
  moduleResolver: { getPluginResolver },
  datatypes: { assertTypes, isPlainObject },
  env: { isDebug },
  logger, chalk
} = require('@vuepress/shared-utils')

/**
 * Expose PluginAPI class.
 */

module.exports = class PluginAPI {
  constructor (context) {
    this.options = {}
    this._pluginContext = context
    this._pluginQueue = []
    this._initialized = false
    this._pluginResolver = getPluginResolver()
    this.initializeOptions(PLUGIN_OPTION_MAP)
  }

  /**
   * Get enabled plugins
   *
   * @returns {array}
   * @api public
   */

  get enabledPlugins () {
    return this._pluginQueue.filter(({ enabled }) => enabled)
  }

  /**
   * Get disabled plugins
   *
   * @returns {array}
   * @api public
   */

  get disabledPlugins () {
    return this._pluginQueue.filter(({ enabled }) => !enabled)
  }

  /**
   * initialize plugin.
   *
   * @api public
   */

  initialize () {
    this._initialized = true
    this._pluginQueue.forEach(plugin => {
      if (plugin.enabled) {
        this.applyPlugin(plugin)
      } else {
        logger.debug(`\n${chalk.gray(`[${plugin.name}]`)} disabled.`)
      }
    })
  }

  /**
   * Normalize plugin and push it to the plugin queue.
   *
   * @param {object} pluginRaw
   * @param {object} pluginOptions
   * @returns {module.PluginAPI}
   * @api public
   */

  use (pluginRaw, pluginOptions = {}) {
    if (this._initialized) {
      throw new Error(`Cannot add new plugins after initialization.`)
    }

    let plugin
    if (isPlainObject(pluginRaw) && pluginRaw.$$normalized) {
      plugin = pluginRaw
    } else {
      plugin = this.normalizePlugin(pluginRaw, pluginOptions)
    }

    if (plugin.multiple !== true) {
      const duplicateIndex = this._pluginQueue.findIndex(({ name }) => name === plugin.name)
      if (duplicateIndex !== -1) {
        this._pluginQueue.splice(duplicateIndex, 1)
      }
    }

    this._pluginQueue.push(plugin)

    if (plugin.plugins) {
      logger.debug(`\nStart to use plugins defined at ${chalk.gray(plugin.name)}`)
      logger.debug(JSON.stringify(plugin.plugins, null, 2))
      this.useByPluginsConfig(plugin.plugins)
    }

    return this
  }

  /**
   * normalize plugin
   * @param pluginRaw
   * @param pluginOptions
   * @api public
   */

  normalizePlugin (pluginRaw, pluginOptions = {}) {
    let plugin = this._pluginResolver.resolve(pluginRaw)
    if (!plugin.entry) {
      console.warn(`[vuepress] cannot resolve plugin "${pluginRaw}"`)
      return this
    }
    plugin = flattenPlugin(plugin, pluginOptions, this._pluginContext, this)
    plugin.$$normalized = true
    return plugin
  }

  /**
   * Use plugin by config.
   *
   * @param pluginsConfig
   * @returns {module.PluginAPI}
   * @api public
   */

  useByPluginsConfig (pluginsConfig) {
    pluginsConfig = normalizePluginsConfig(pluginsConfig)
    pluginsConfig.forEach(([pluginRaw, pluginOptions]) => {
      this.use(pluginRaw, pluginOptions)
    })
    return this
  }

  /**
   * initialize plugin options.
   *
   * @api private
   */

  initializeOptions () {
    Object.keys(PLUGIN_OPTION_MAP).forEach(key => {
      const option = PLUGIN_OPTION_MAP[key]
      this.options[option.name] = instantiateOption(option.name)
    })
  }

  /**
   * Register plugin option.
   *
   * @param {string} key
   * @param {any} value
   * @param {string} pluginName
   * @returns {module.PluginAPI}
   * @api private
   */

  registerOption (key, value, pluginName) {
    const option = PLUGIN_OPTION_MAP[key]
    const types = option.types
    const { valid, warnMsg } = assertTypes(value, types)
    if (valid) {
      this.options[option.name].add(pluginName, value)
    } else if (value !== undefined) {
      logger.warn(
        `${chalk.gray(pluginName)} ` +
        `Invalid value for "option" ${chalk.cyan(option.name)}: ${warnMsg}`
      )
    }
    return this
  }

  /**
   * apply plugin.
   *
   * @api private
   */

  applyPlugin ({
    // info
    name: pluginName,
    shortcut,

    // hooks
    ready,
    compiled,
    updated,
    generated,

    // options
    chainWebpack,
    enhanceDevServer,
    extendMarkdown,
    chainMarkdown,
    enhanceAppFiles,
    outFiles,
    extendPageData,
    clientDynamicModules,
    clientRootMixin,
    additionalPages,
    globalUIComponents,
    define,
    alias
  }) {
    const isInternalPlugin = pluginName.startsWith('@vuepress/internal-')
    if (shortcut) {
      logger.tip(`\nApply plugin ${chalk.magenta(shortcut)} ${chalk.gray(`(i.e. "${pluginName}")`)} ...`)
    } else if (!isInternalPlugin || isDebug) {
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
      .registerOption(PLUGIN_OPTION_MAP.CHAIN_MARKDOWN.key, chainMarkdown, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.EXTEND_PAGE_DATA.key, extendPageData, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.ENHANCE_APP_FILES.key, enhanceAppFiles, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.OUT_FILES.key, outFiles, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.CLIENT_DYNAMIC_MODULES.key, clientDynamicModules, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.CLIENT_ROOT_MIXIN.key, clientRootMixin, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.ADDITIONAL_PAGES.key, additionalPages, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.GLOBAL_UI_COMPONENTS.key, globalUIComponents, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.DEFINE.key, define, pluginName)
      .registerOption(PLUGIN_OPTION_MAP.ALIAS.key, alias, pluginName)
  }
}
