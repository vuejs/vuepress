const path = require('path')
const Plugin = require('../plugin-api/index')
const PluginContext = require('../plugin-api/context')

module.exports = function (options) {
  const { siteConfig, themeConfig, sourceDir, themePath, themePlugins, cliPlugins } = options
  const pluginContext = new PluginContext(options)
  const plugin = new Plugin(pluginContext)

  plugin
    // user plugin
    .useByPluginsConfig(cliPlugins)
    .useByPluginsConfig(siteConfig.plugins)
    .useByPluginsConfig(themePlugins)
    // built-in plugins
    .use('@vuepress/enhance-app')
    .use('@vuepress/register-components', {
      componentsDir: [
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
    plugin.use('@vuepress/last-updated')
  }

  return plugin
}
