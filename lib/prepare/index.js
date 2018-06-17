const path = require('path')
const fs = require('fs-extra')
const resolveOptions = require('./resolveOptions')
const resolveSiteData = require('./resolveSiteData')
const resolvePlugin = require('./resolvePlugin')
const { genRoutesFile } = require('./codegen')
const { writeTemp } = require('./util')

module.exports = async function prepare (sourceDir, isProd) {
  // 1. load options
  const options = await resolveOptions(sourceDir)
  options.isProd = isProd
  const { markdown } = options

  // 2. resolve plugin
  const plugin = resolvePlugin(options)
  options.plugin = plugin

  // 3. resolve siteData
  // SiteData must be resolved after the plugin initialization
  // because plugins can be able to extend the sitedata.
  options.siteData = await resolveSiteData(options)
  Object.freeze(options)

  await plugin.hooks.ready.run()

  // 4. Apply plugin options to extend markdown.
  plugin.options.extendMarkdown.run(markdown)
  plugin.options.clientDynamicModules.run()

  // 5. generate routes code
  const routesCode = await genRoutesFile(options)
  await writeTemp('routes.js', routesCode)

  // 6. generate siteData
  const dataCode = `export const siteData = ${JSON.stringify(options.siteData, null, 2)}`
  await writeTemp('siteData.js', dataCode)

  // 7. handle user override
  const overridePath = path.resolve(sourceDir, '.vuepress/override.styl')
  const hasUserOverride = fs.existsSync(overridePath)
  await writeTemp(`override.styl`, hasUserOverride ? `@import(${JSON.stringify(overridePath)})` : ``)

  await plugin.options.enhanceAppFiles.run()

  return options
}
