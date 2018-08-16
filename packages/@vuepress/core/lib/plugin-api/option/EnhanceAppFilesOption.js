const fs = require('fs-extra')
const chalk = require('chalk')
const Option = require('../Option')
const { writeTemp } = require('../../prepare/util')
const { pathsToModuleCode } = require('../../prepare/codegen')
const logger = require('../../util/logger')

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

  async apply (...args) {
    await this.beforeApply()
    const manifest = []
    let moduleId = 0
    let injectedCode = ''

    // 1. write enhance app files.
    for (const { value: filepath, name: pluginName } of this.items) {
      let destPath

      if (typeof filepath === 'object') {
        const { name, content } = filepath
        if (content.includes('export default') || content.includes('module.exports')) {
          destPath = await writeTemp(`app-enhancers/${name}.js`, content)
        } else {
          injectedCode += `/*
 * injected by vuepress-plugin-${pluginName} 
 * file name: ${name}
 */\n${content}\n\n`
        }
      } else {
        if (fs.existsSync(filepath)) {
          destPath = await writeTemp(
            `app-enhancers/enhancer-${moduleId++}.js`,
            `export { default } from '${(filepath)}'`
          )
        } else {
          logger.debug(
            chalk.gray(`[${pluginName}] `) +
            `${chalk.cyan(filepath)} Not Found.`
          )
        }
      }
      if (destPath) {
        manifest.push(destPath)
      }
    }

    const injectedCodeDestPath = await writeTemp(
      `app-enhancers/inject.js`,
      injectedCode + 'export default {}\n'
    )
    manifest.push(injectedCodeDestPath)

    // 2. write entry file.
    await writeTemp('app-enhancers.js', pathsToModuleCode(manifest))
  }
}
