const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const AbstractAPI = require('./AbstractAPI')
const { writeTemp } = require('../../prepare/util')
const logger = require('../../util/logger')

module.exports = class EnhanceAppFilesAPI extends AbstractAPI {
  add (value, pluginName) {
    if (typeof value === 'function') {
      value = value()
    }
    this.items.push(...value.map(filepath => ({
      pluginName,
      filepath
    })))
  }

  async run (...args) {
    const manifest = []

    for (const [index, { filepath, pluginName }] of this.items.entries()) {
      if (fs.existsSync(filepath)) {
        let filename = path.parse(filepath).base
        filename = `enhanceAppFiles-${index}.js`

        const destPath = await writeTemp(
          filename,
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

    await writeTemp(
      'appEnhancers.js',
      this.getEnhanceAppCode(manifest)
    )
  }

  getEnhanceAppCode (files) {
    let index = 0
    let code = ''

    code += files
      .map(filepath => `import m${index++} from ${JSON.stringify(filepath)}`)
      .join('\n')

    code += '\n\nexport default [\n'

    for (let i = 0; i < index; i++) {
      code += `  m${i}`
      code += i === index - 1 ? '\n' : ',\n'
    }

    code += ']\n'

    return code
  }
}
