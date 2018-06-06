const fs = require('fs-extra')
const chalk = require('chalk')
const Tapable = require('../core/Tapable')
const { writeTemp } = require('../../prepare/util')
const { pathsToModuleCode } = require('../../prepare/codegen')
const logger = require('../../util/logger')

module.exports = class EnhanceAppFilesOption extends Tapable {
  add (value, pluginName) {
    if (typeof value === 'function') {
      value = value()
    }
    super.add(value, pluginName)
  }

  async run (...args) {
    const manifest = []

    // 1. write enhance app files.
    for (const [index, value] of this.items.entries()) {
      const { filepath, pluginName } = value
      if (fs.existsSync(filepath)) {
        const destPath = await writeTemp(
          `enhance-app-files/${index}.js`,
          `export { default } from ${JSON.stringify(filepath)}`
        )
        manifest.push(destPath)
      } else {
        logger.debug(
          chalk.gray(`[vuepress-plugin-${pluginName}]`) +
          `${chalk.cyan(filepath)} Not Found.`
        )
      }
    }

    // 2. write entry file.
    await writeTemp('appEnhancers.js', pathsToModuleCode(manifest))
  }
}
