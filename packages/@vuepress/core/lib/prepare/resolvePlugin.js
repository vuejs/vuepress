const path = require('path')
const Plugin = require('../plugin-api/index')
const PluginContext = require('../plugin-api/context')

const lastUpdatedPlugin = require('@vuepress/plugin-last-updated')
const enhanceAppPlugin = require('@vuepress/plugin-enhance-app')
const registerGlobalComponentsPlugin = require('@vuepress/plugin-register-global-components')

module.exports = function (options) {
  const { siteConfig, themeConfig, sourceDir, themePath, themePlugins } = options
  const pluginContext = new PluginContext(options)
  const plugin = new Plugin(pluginContext)

  plugin
    // user plugin
    .useByConfigs(siteConfig.plugins)
    .useByConfigs(themePlugins)
    // built-in plugins
    .use(enhanceAppPlugin)
    .use(registerGlobalComponentsPlugin, {
      baseDirs: [
        path.resolve(sourceDir, '.vuepress/components'),
        path.resolve(themePath, 'components')
      ]
    })

  // whether to use last updated
  const shouldUseLastUpdated = (
    themeConfig.lastUpdated ||
    Object.keys(siteConfig.locales && themeConfig.locales || {})
      .some(base => themeConfig.locales[base].lastUpdated)
  )
  if (shouldUseLastUpdated) {
    plugin.use(lastUpdatedPlugin)
  }

  return plugin
}
