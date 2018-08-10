const path = require('path')
const Plugin = require('../plugin-api/index')
const PluginContext = require('../plugin-api/context')

const lastUpdatedPlugin = require('../../../plugin-last-updated/index')
const enhanceAppPlugin = require('../../../plugin-enhance-app/index')
const registerGlobalComponentsPlugin = require('../../../plugin-register-global-components/index')
const activeHeaderLinksPlugin = require('../../../plugin-active-header-links/index')

module.exports = function (options) {
  const { siteConfig, themeConfig, sourceDir, themePath } = options
  const pluginContext = new PluginContext(options)
  const plugin = new Plugin(pluginContext)

  plugin
    // user plugin
    .useByConfigs(siteConfig.plugins)
    // built-in plugins
    .use(enhanceAppPlugin)
    .use(registerGlobalComponentsPlugin, {
      baseDirs: [
        path.resolve(sourceDir, '.vuepress/components'),
        path.resolve(themePath, 'components')
      ]
    })

  // whether to use active header links
  const { activeHeaderLinks = true } = themeConfig
  if (activeHeaderLinks) {
    plugin.use(activeHeaderLinksPlugin)
  }

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
