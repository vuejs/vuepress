const path = require('path')
const fs = require('fs-extra')
const resolveOptions = require('./resolveOptions')
const resolveSiteData = require('./resolveSiteData')
const resolvePlugin = require('./resolvePlugin')
const { genRoutesFile, genComponentRegistrationFile } = require('./codegen')
const { writeTemp } = require('./util')

module.exports = async function prepare (sourceDir) {
  // 1. load options
  const options = await resolveOptions(sourceDir)
  const { siteConfig, markdown } = options

  // 2. resolve plugin
  const plugin = resolvePlugin(siteConfig.plugins, options)
  options.plugin = plugin

  // 3. Apply plugin options to extend makrdown.
  plugin.options.extendMarkdown.run(markdown)

  // 4. resolve siteData
  // SiteData must be resolved after the plugin initialization
  // because plugins can be able to extend the sitedata.
  options.siteData = await resolveSiteData(options)
  Object.freeze(options)

  await plugin.hooks.ready.run(options)

  // 5. generate routes & user components registration code
  const routesCode = await genRoutesFile(options)
  const componentCode = await genComponentRegistrationFile(options)

  await writeTemp('routes.js', [
    componentCode,
    routesCode
  ].join('\n'))

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
