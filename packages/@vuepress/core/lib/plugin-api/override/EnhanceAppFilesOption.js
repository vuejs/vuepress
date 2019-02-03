'use strict'

/**
 * Module dependencies.
 */

const AsyncOption = require('../abstract/AsyncOption')
const {
  fs,
  chalk,
  logger,
  codegen: { pathsToModuleCode },
  datatypes: { isPlainObject }
} = require('@vuepress/shared-utils')

/**
 * enhanceAppFiles option.
 */

module.exports = class EnhanceAppFilesOption extends AsyncOption {
  async apply (ctx) {
    await super.asyncApply()

    const manifest = []
    let moduleId = 0

    async function writeEnhancer (name, content, hasDefaultExport = true) {
      return await ctx.writeTemp(
        `app-enhancers/${name}.js`,
        hasDefaultExport
          ? content
          : content + '\nexport default {}'
      )
    }

    // 1. write enhance app files.
    for (const { value: enhanceAppFile, name: pluginName } of this.appliedItems) {
      let destPath

      // 1.1 dynamic code
      if (isPlainObject(enhanceAppFile)) {
        const { content } = enhanceAppFile
        let { name } = enhanceAppFile
        name = name.replace(/.js$/, '')

        if (hasDefaultExport(content)) {
          destPath = await writeEnhancer(name, content)
        } else {
          destPath = await writeEnhancer(name, content, false /* do not contain default export*/)
        }
        // 1.2 pointing to a file
      } else {
        if (fs.existsSync(enhanceAppFile)) {
          const content = await fs.readFile(enhanceAppFile, 'utf-8')

          if (hasDefaultExport(content)) {
            destPath = await writeEnhancer(
              moduleId++,
              `export { default } from ${JSON.stringify(enhanceAppFile)}`
            )
          } else {
            destPath = await writeEnhancer(
              moduleId++,
              `import ${JSON.stringify(enhanceAppFile)}`,
              false /* do not contain default export*/
            )
          }
        } else {
          logger.developer(
            chalk.gray(`[${pluginName}] `)
            + `${chalk.cyan(enhanceAppFile)} Not Found.`
          )
        }
      }

      if (destPath) {
        manifest.push(destPath)
      }
    }

    // 2. write entry file.
    await ctx.writeTemp('internal/app-enhancers.js', pathsToModuleCode(manifest))
  }
}

function hasDefaultExport (content) {
  return content.includes('export default') || content.includes('module.exports')
}
