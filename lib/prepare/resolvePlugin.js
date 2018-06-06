const path = require('path')
const Plugin = require('../plugin-api')
const PluginContext = require('../plugin-api/context')

// built-in plugins
const lastUpdatedPlugin = require('../../packages/vuepress-plugin-last-updated')
const enhanceApp = require('../../packages/vuepree-plugin-enhance-app')
const registerGlobalComponents = require('../../packages/vuepress-plugin-register-global-components')

module.exports = function (options) {
  const { siteConfig, sourceDir, themePath } = options
  const pluginContext = new PluginContext(options)
  const plugin = new Plugin(pluginContext)

  plugin
    .use(lastUpdatedPlugin)
    .use(enhanceApp)
    .use(registerGlobalComponents, {
      baseDirs: [
        path.resolve(sourceDir, '.vuepress/components'),
        path.resolve(themePath, 'components')
      ]
    })
    .useByConfigs(siteConfig.plugins)

  return plugin
}
