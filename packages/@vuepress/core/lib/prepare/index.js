const path = require('path')
const resolveOptions = require('./resolveOptions')
const resolveSiteData = require('./resolveSiteData')
const Plugin = require('../plugin-api/index')
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
  const plugin = new Plugin(pluginContext)

  const shouldUseLastUpdated = (
    themeConfig.lastUpdated ||
    Object.keys(siteConfig.locales && themeConfig.locales || {})
      .some(base => themeConfig.locales[base].lastUpdated)
  )

  plugin
    // internl core plugins
    .use(require('../internal-plugins/routes'))
    .use(require('../internal-plugins/rootMixins'))
    .use(require('../internal-plugins/importAsyncComponent'))
    .use(require('../internal-plugins/enhanceApp'))
    .use(require('../internal-plugins/siteData'))
    .use(require('../internal-plugins/overrideCSS'))
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

  plugin.apply()

  options.plugin = plugin
  const pluginOptions = plugin.options

  // 3. resolve siteData
  // SiteData must be resolved after the plugin initialization
  // because plugins can be able to extend the sitedata.
  options.siteData = await resolveSiteData(options)
  Object.freeze(options)

  await pluginOptions.ready.apply()

  // 4. apply plugin options to extend markdown.
  pluginOptions.extendMarkdown.syncApply(markdown)
  await pluginOptions.clientDynamicModules.apply()
  await pluginOptions.globalUIComponents.apply()

  await pluginOptions.enhanceAppFiles.apply()

  return options
}
