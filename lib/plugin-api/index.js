const chalk = require('chalk')
const { resolvePlugin, inferPluginName, assertTypes } = require('./util')
const Hook = require('./hook')
const logger = require('../util/logger')

module.exports = class VuePressPlugin {
  constructor (pluginConfigs) {
    this.hooks = {}
    this.apis = {}
    this.extendHooks([
      'ready',
      'compiled',
      'updated',
      'generated'
    ])
    this.extendAPIs([
      'client',
      'chainWebpack',
      'enhanceDevServer',
      'extendMarkdown',
      'enhanceAppFiles',
      'outFiles',
      'extendPageData'
    ])
    this.resolvePluginConfigs(pluginConfigs)
  }

  extendHooks (hooks) {
    hooks.forEach(hook => {
      this.hooks[hook] = new Hook(hook)
    })
  }

  extendAPIs (apis) {
    apis.forEach(api => {
      this.apis[api] = []
    })
  }

  registerHook (name, hook, pluginName, types) {
    const { valid, warnMsg } = assertTypes(hook, types)
    if (valid) {
      this.hooks[name].tap(pluginName, hook)
    } else if (hook !== undefined) {
      logger.warn(
        `${chalk.gray(`[vuepress-plugin-${pluginName}]`)} ` +
        `Invalid value for "option" ${chalk.cyan(name)}: ${warnMsg}`
      )
    }
    return this
  }

  registerAPI (name, api, pluginName, types) {
    const { valid, warnMsg } = assertTypes(api, types)
    if (valid) {
      this.apis[name].push(api)
    } else if (api !== undefined) {
      logger.warn(
        `${chalk.gray(`[vuepress-plugin-${pluginName}]`)} ` +
        `Invalid value for "option" ${chalk.cyan(name)}: ${warnMsg}`
      )
    }
    return this
  }

  resolvePluginConfigs (pluginConfigs) {
    pluginConfigs.forEach(pluginConfigs => {
      pluginConfigs = Array.isArray(pluginConfigs)
        ? pluginConfigs
        : [pluginConfigs]
      const [pluginRaw, pluginOptions] = pluginConfigs
      let plugin = resolvePlugin(pluginRaw)
      if (typeof plugin === 'function') {
        plugin = plugin(pluginOptions)
      }
      plugin = Object.assign(plugin, { name: inferPluginName(pluginRaw, plugin) })
      this.resolvePluginConfig(plugin)
    })
  }

  resolvePluginConfig ({
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
    this
      .registerHook('ready', ready, name, [Function])
      .registerHook('compiled', compiled, name, [Function])
      .registerHook('updated', updated, name, [Function])
      .registerHook('generated', generated, name, [Function])

    this
      .registerAPI('client', client, name, [String])
      .registerAPI('chainWebpack', chainWebpack, name, [Function])
      .registerAPI('enhanceDevServer', enhanceDevServer, name, [Function])
      .registerAPI('extendMarkdown', extendMarkdown, name, [Function])
      .registerAPI('enhanceAppFiles', enhanceAppFiles, name, [Object])
      .registerAPI('outFiles', outFiles, name, [Object])
      .registerAPI('extendPageData', extendPageData, name, [Function])
  }
}
