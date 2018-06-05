const chalk = require('chalk')
const Hook = require('./core/Hook')
const instantiateAPI = require('./option/instantiateOption')
const logger = require('../util/logger')
const { resolvePlugin, inferPluginName } = require('./util')
const { assertTypes } = require('../util/shared')
const { HOOK, OPTION } = require('./constans')

module.exports = class Plugin {
  constructor (pluginConfigs, context) {
    if (!Array.isArray(pluginConfigs)) {
      pluginConfigs = []
    }
    this.hooks = {}
    this.options = {}
    this.extendHooks(Object.values(HOOK))
    this.extendOptions(Object.values(OPTION))
    this.resolvePluginConfigs(pluginConfigs, context)
  }

  extendHooks (hooks) {
    hooks.forEach(hook => {
      this.hooks[hook] = new Hook(hook)
    })
  }

  extendOptions (options) {
    options.forEach(api => {
      this.options[api] = instantiateAPI(api)
    })
  }

  registerHook (name, hook, pluginName, types) {
    const { valid, warnMsg } = assertTypes(hook, types)
    if (valid) {
      this.hooks[name].tap(pluginName, hook)
    } else if (hook !== undefined) {
      logger.warn(
        `${chalk.gray(`[vuepress-plugin-${pluginName}]`)} ` +
        `Invalid value for "hook" ${chalk.cyan(name)}: ${warnMsg}`
      )
    }
    return this
  }

  registerOption (name, api, pluginName, types) {
    const { valid, warnMsg } = assertTypes(api, types)
    if (valid) {
      this.options[name].tap(pluginName, api)
    } else if (api !== undefined) {
      logger.warn(
        `${chalk.gray(`[vuepress-plugin-${pluginName}]`)} ` +
        `Invalid value for "option" ${chalk.cyan(name)}: ${warnMsg}`
      )
    }
    return this
  }

  resolvePluginConfigs (pluginConfigs, context) {
    pluginConfigs.forEach(pluginConfigs => {
      pluginConfigs = Array.isArray(pluginConfigs)
        ? pluginConfigs
        : [pluginConfigs]
      const [pluginRaw, pluginOptions] = pluginConfigs
      let plugin = resolvePlugin(pluginRaw)
      if (typeof plugin === 'function') {
        plugin = plugin(pluginOptions, context)
      }
      plugin = Object.assign(plugin, { name: inferPluginName(pluginRaw, plugin) })
      this.applyPlugin(plugin)
    })
  }

  // async callOption (name, args) {
  //   await this.options[name].run(args)
  // }
  //
  // async callHook (name, args) {
  //   await this.hooks[name].run(args)
  // }

  applyPlugin ({
    name,
    client,
    chainWebpack,
    enhanceDevServer,
    extendMarkdown,
    enhanceAppFiles,
    outFiles,
    extendPageData,
    ready,
    compiled,
    updated,
    generated
  }) {
    logger.tip(`\nApply plugin ${chalk.cyan(name)}...`)

    this
      .registerHook(HOOK.READY, ready, name, [Function])
      .registerHook(HOOK.COMPILED, compiled, name, [Function])
      .registerHook(HOOK.UPDATED, updated, name, [Function])
      .registerHook(HOOK.GENERATED, generated, name, [Function])

    this
      .registerOption(OPTION.CLIENT, client, name, [String])
      .registerOption(OPTION.CHAIN_WEBPACK, chainWebpack, name, [Function])
      .registerOption(OPTION.ENHANCE_DEV_SERVER, enhanceDevServer, name, [Function])
      .registerOption(OPTION.EXTEND_MARKDOWN, extendMarkdown, name, [Function])
      .registerOption(OPTION.EXTEND_PAGE_DATA, extendPageData, name, [Function])
      .registerOption(OPTION.ENHANCE_APP_FILES, enhanceAppFiles, name, [Array, Function])
      .registerOption(OPTION.OUT_FILES, outFiles, name, [Object])
  }
}
