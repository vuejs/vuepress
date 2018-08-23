const path = require('path')
const resolveOptions = require('./resolveOptions')
const resolveSiteData = require('./resolveSiteData')
const PluginAPI = require('../plugin-api/index')
const PluginContext = require('../plugin-api/context')

module.exports = async function prepare ({
  sourceDir,
  isProd,
  cliOptions
}) {
  // 1. load options
  const options = await resolveOptions(sourceDir, cliOptions)
  options.isProd = isProd

  // 2. apply plugins
  const { siteConfig, themeConfig, themePath, themePlugins, cliPlugins, markdown } = options
  const pluginContext = new PluginContext(options)
  const pluginAPI = new PluginAPI(pluginContext)
  options.pluginAPI = pluginAPI

  const shouldUseLastUpdated = (
    themeConfig.lastUpdated ||
    Object.keys(siteConfig.locales && themeConfig.locales || {})
      .some(base => themeConfig.locales[base].lastUpdated)
  )

  pluginAPI
    // internl core plugins
    .use(require('../internal-plugins/routes'))
    .use(require('../internal-plugins/rootMixins'))
    .use(require('../internal-plugins/importAsyncComponent'))
    .use(require('../internal-plugins/enhanceApp'))
    .use(require('../internal-plugins/siteData'))
    .use(require('../internal-plugins/overrideCSS'))
    .use(require('../internal-plugins/data-mixins'))
    // user plugin
    .useByPluginsConfig(cliPlugins)
    .useByPluginsConfig(siteConfig.plugins)
    .useByPluginsConfig(themePlugins)
    // built-in plugins
    .use('@vuepress/last-updated', shouldUseLastUpdated)
    .use('@vuepress/register-components', {
      componentsDir: [
        path.resolve(sourceDir, '.vuepress/components'),
        path.resolve(themePath, 'components')
      ]
    })
    .apply()

  // 3. resolve siteData
  // SiteData must be resolved after the plugin initialization
  // because plugins can be able to extend the sitedata.
  options.siteData = await resolveSiteData(options)

  // 4. ready hook, user can do some options transformation here.
  await pluginAPI.options.ready.apply()

  // 5. apply plugin options
  pluginAPI.options.extendMarkdown.syncApply(markdown)
  await pluginAPI.options.clientDynamicModules.apply()
  await pluginAPI.options.globalUIComponents.apply()
  await pluginAPI.options.enhanceAppFiles.apply()

  return options
}
