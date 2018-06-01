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
    this.resolvePluginConfig(pluginConfigs)
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

  resolvePluginConfigs (pluginConfigs) {
    pluginConfigs.forEach(([name, pluginOptions]) => {
      let plugin = resolvePlugin(name)
      if (typeof plugin === 'function') {
        plugin = plugin(pluginOptions)
      }
      plugin = Object.assign(plugin, { name: inferPluginName(name, plugin) })
      this.resolvePluginConfig(plugin)
    })
  }

  registerHook (name, hook, symbol) {
    this.hooks[name].tap(symbol, hook)
    return this
  }

  registerAPI (name, api) {
    this.apis[name].push(api)
    return this
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
