const fs = require('fs-extra')
const chalk = require('chalk')
const Tapable = require('../core/Tapable')
const { writeTemp } = require('../../prepare/util')
const { pathsToModuleCode } = require('../../prepare/codegen')
const logger = require('../../util/logger')

module.exports = class EnhanceAppFilesOption extends Tapable {
  tap (pluginName, value) {
    if (typeof value === 'function') {
      value = value()
    }
    super.tap(pluginName, value)
  }

  async run (...args) {
    const manifest = []

    console.log(this.items)

    // 1. write enhance app files.
    for (const [index, value] of this.items.entries()) {
      const { value: filepath, name: pluginName } = value
      if (fs.existsSync(filepath)) {
        const destPath = await writeTemp(
          `app-enhancers/enhancer-${index}.js`,
          `export { default } from ${JSON.stringify(filepath)}`
        )
        manifest.push(destPath)
      } else {
        logger.debug(
          chalk.gray(`[vuepress-plugin-${pluginName}] `) +
          `${chalk.cyan(filepath)} Not Found.`
        )
      }
    }

    // 2. write entry file.
    await writeTemp('app-enhancers.js', pathsToModuleCode(manifest))
  }
}
