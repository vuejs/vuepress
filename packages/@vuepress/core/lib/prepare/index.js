const path = require('path')
const fs = require('fs-extra')
const resolveOptions = require('./resolveOptions')
const resolveSiteData = require('./resolveSiteData')
const resolvePlugin = require('./resolvePlugin')
const { genRoutesFile } = require('./codegen')
const { writeTemp } = require('./util')
const logger = require('../util/logger')
const chalk = require('chalk')

module.exports = async function prepare ({
  sourceDir,
  isProd,
  cliOptions
}) {
  // 1. load options
  const options = await resolveOptions(sourceDir, cliOptions)
  options.isProd = isProd
  const { markdown } = options

  // 2. resolve plugin
  const plugin = resolvePlugin(options)
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

  // 5. generate routes code
  const routesCode = await genRoutesFile(options)
  await writeTemp('routes.js', routesCode)

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
