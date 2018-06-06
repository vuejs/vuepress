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
    // 1. user plugin
    .useByConfigs(siteConfig.plugins)
    // 2. built-in plugins
    .use(enhanceAppPlugin)
    .use(registerGlobalComponentsPlugin, {
      baseDirs: [
        path.resolve(sourceDir, '.vuepress/components'),
        path.resolve(themePath, 'components')
      ]
    })

  // 1. whether to use active header links
  const { activeHeaderLinks = true } = themeConfig
  if (activeHeaderLinks) {
    plugin.use(activeHeaderLinksPlugin)
  }

  // 2. whether to use last updated
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
