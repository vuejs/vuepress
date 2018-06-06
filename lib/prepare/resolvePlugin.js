const path = require('path')
const Plugin = require('../plugin-api')
const PluginContext = require('../plugin-api/context')

// built-in plugins
const lastUpdatedPlugin = require('../../packages/vuepress-plugin-last-updated')
const enhanceAppPlugin = require('../../packages/vuepress-plugin-enhance-app')
const registerGlobalComponentsPlugin = require('../../packages/vuepress-plugin-register-global-components')
const activeHeaderLinksPlugin = require('../../packages/vuepress-plugin-active-header-links')

module.exports = function (options) {
  const { siteConfig, themeConfig, sourceDir, themePath } = options
  const pluginContext = new PluginContext(options)
  const plugin = new Plugin(pluginContext)

  plugin
    .use(lastUpdatedPlugin)
    .use(enhanceAppPlugin)
    .use(registerGlobalComponentsPlugin, {
      baseDirs: [
        path.resolve(sourceDir, '.vuepress/components'),
        path.resolve(themePath, 'components')
      ]
    })
    .useByConfigs(siteConfig.plugins)

  const { activeHeaderLinks = true } = themeConfig
  if (activeHeaderLinks) {
    plugin.use(activeHeaderLinksPlugin)
  }

  return plugin
}
