const { getContextSingleton } = require('./context')

class PluginTestAPI {
  constructor (context) {
    this.context = context
  }

  get markdown () {
    return this.context.markdown
  }

  extendMarkdown () {
    this.context.pluginAPI.options.extendMarkdown.syncApply(this.context.markdown)
  }
}

module.exports = async function (plugin, options, context) {
  const contexnt = context || (await getContextSingleton())
  contexnt.use(plugin, options)
  return new PluginTestAPI(context)
}
