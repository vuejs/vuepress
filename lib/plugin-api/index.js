const { resolvePlugin, inferPluginName } = require('./util')
const Hook = require('./hook')

module.exports = class Plugin {
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
    pluginConfigs.forEach(([name, pluginOptions]) => {
      let plugin = resolvePlugin(name)
      if (typeof plugin === 'function') {
        plugin = plugin(pluginOptions)
      }
      console.log(plugin)
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
    console.log(this.hooks)
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
