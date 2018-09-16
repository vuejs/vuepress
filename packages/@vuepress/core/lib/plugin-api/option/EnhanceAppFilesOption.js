const Option = require('../Option')
const {
  fs,
  chalk,
  logger,
  codegen: { pathsToModuleCode },
  datatypes: { isPlainObject }
} = require('@vuepress/shared-utils')

module.exports = class EnhanceAppFilesOption extends Option {
  /**
   * In fact, we can quickly implement support for function parameters
   * by overriding 'tap', but 'tap' will be executed immediately
   * when the plugin is initialized so that we cannot get the dynamic
   * returned value.
   *
   * A useful use case for 'dynamic return value' is that the user can
   * write a dynamic file in the 'ready' hook, and add the dest path to
   * the current plugin context, then return it with a function and
   * assign it to enhanceAppFiles.
   */
  async beforeApply () {
    const items = this.items
    this.items = []
    for (const { name, value } of items) {
      if (typeof value === 'function') {
        const res = await value()
        this.tap(name, res)
      } else {
        this.tap(name, value)
      }
    }
  }

  async apply (context) {
    await this.beforeApply()
    const manifest = []
    let moduleId = 0

    async function writeEnhancer (name, content, hasDefaultExport = true) {
      return await context.writeTemp(
        `app-enhancers/${name}.js`,
        hasDefaultExport
          ? content
          : content + '\nexport default {}'
      )
    }

    // 1. write enhance app files.
    for (const { value: enhanceAppFile, name: pluginName } of this.items) {
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
        // 1.2 local file
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
          logger.debug(
            chalk.gray(`[${pluginName}] `) +
            `${chalk.cyan(enhanceAppFile)} Not Found.`
          )
        }
      }

      if (destPath) {
        manifest.push(destPath)
      }
    }

    // 2. write entry file.
    await context.writeTemp('internal/app-enhancers.js', pathsToModuleCode(manifest))
  }
}

function hasDefaultExport (content) {
  return content.includes('export default') || content.includes('module.exports')
}
