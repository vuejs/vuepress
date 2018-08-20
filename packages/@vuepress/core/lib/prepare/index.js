const path = require('path')
const resolveOptions = require('./resolveOptions')
const resolveSiteData = require('./resolveSiteData')
const { fs, chalk, logger, writeTemp } = require('@vuepress/shared-utils')
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

  // 6. generate siteData
  const dataCode = `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`
  await writeTemp('siteData.js', dataCode)

  // 7. handle user override
  const overridePath = path.resolve(sourceDir, '.vuepress/override.styl').replace(/[\\]+/g, '/')
  const hasUserOverride = fs.existsSync(overridePath)
  await writeTemp('override.styl', hasUserOverride ? `@import(${JSON.stringify(overridePath)})` : ``)

  const stylePath = path.resolve(sourceDir, '.vuepress/style.styl').replace(/[\\]+/g, '/')
  const hasUserStyle = fs.existsSync(stylePath)
  await writeTemp('style.styl', hasUserStyle ? `@import(${JSON.stringify(stylePath)})` : ``)

  // Temporary tip, will be removed at next release.
  if (hasUserOverride && !hasUserStyle) {
    logger.tip(
      `${chalk.magenta('override.styl')} has been split into 2 APIs, we recommend you upgrade to continue.\n` +
      `      See: ${chalk.magenta('https://vuepress.vuejs.org/default-theme-config/#simple-css-override')}`
    )
  }

  await pluginOptions.enhanceAppFiles.apply()

  return options
}
