const Plugin = require('../plugin-api')
const PluginContext = require('../plugin-api/context')

// built-in plugins
const lastUpdatedPlugin = require('../../packages/vuepress-plugin-last-updated')
const enhanceApp = require('../../packages/vuepree-plugin-enhance-app')

module.exports = function (pluginConfigs, context) {
  const pluginContext = new PluginContext(context)
  const plugin = new Plugin(pluginContext)

  plugin
    .use(lastUpdatedPlugin)
    .use(enhanceApp)
    .useByConfigs(pluginConfigs)

  return plugin
}
