const Option = require('../Option')
const {
  fs,
  chalk,
  logger,
  writeTemp,
  codegen: { pathsToModuleCode }
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

  async apply () {
    await this.beforeApply()
    const manifest = []
    let moduleId = 0

    // 1. write enhance app files.
    for (const { value: filePath, name: pluginName } of this.items) {
      let destPath

      if (typeof filePath === 'object') {
        const { name, content } = filePath
        if (content.includes('export default') || content.includes('module.exports')) {
          destPath = await writeTemp(`app-enhancers/${name}`, content)
        } else {
          destPath = await writeTemp(`app-enhancers/${name}`, content + '\nexport default {}')
        }
      } else {
        if (fs.existsSync(filePath)) {
          destPath = await writeTemp(
            `app-enhancers/enhancer-${moduleId++}.js`,
            `export { default } from '${(filePath)}'`
          )
        } else {
          logger.debug(
            chalk.gray(`[${pluginName}] `) +
            `${chalk.cyan(filePath)} Not Found.`
          )
        }
      }
      if (destPath) {
        manifest.push(destPath)
      }
    }

    // 2. write entry file.
    await writeTemp('app-enhancers.js', pathsToModuleCode(manifest))
  }
}
