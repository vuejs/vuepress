const { resolvePlugin, inferPluginName } = require('./util')
const Hook = require('./hook')

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

  registerHook (name, hook, symbol) {
    if (hook) {
      this.hooks[name].tap(symbol, hook)
    }
    return this
  }

  registerAPI (name, api) {
    if (api) {
      this.apis[name].push(api)
    }
    return this
  }

  resolvePluginConfigs (pluginConfigs) {
    pluginConfigs.forEach(pluginConfigs => {
      pluginConfigs = Array.isArray(pluginConfigs)
        ? pluginConfigs
        : [pluginConfigs]
      const [name, pluginOptions] = pluginConfigs
      let plugin = resolvePlugin(name)
      if (typeof plugin === 'function') {
        plugin = plugin(pluginOptions)
      }
      plugin = Object.assign(plugin, { name: inferPluginName(name, plugin) })
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
      .registerHook('ready', ready, name)
      .registerHook('compiled', compiled, name)
      .registerHook('updated', updated, name)
      .registerHook('generated', generated, name)

    this
      .registerAPI('client', client)
      .registerAPI('chainWebpack', chainWebpack)
      .registerAPI('enhanceDevServer', enhanceDevServer)
      .registerAPI('extendMarkdown', extendMarkdown)
      .registerAPI('enhanceAppFiles', enhanceAppFiles)
      .registerAPI('outFiles', outFiles)
      .registerAPI('extendPageData', extendPageData)
  }
}
