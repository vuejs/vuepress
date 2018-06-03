const fs = require('fs-extra')
const path = require('path')
const AbstractAPI = require('./AbstractAPI')
const { writeTemp } = require('../../prepare/util')

module.exports = class EnhanceAppFilesAPI extends AbstractAPI {
  add (value /* Array<String> | () => Array<String> */, pluginName) {
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

    for (const { filepath, pluginName } of this.items) {
      let filename = path.parse(filepath).base
      filename = `enhanceAppFiles-${pluginName}-${filename}`
      const destPath = await writeTemp(
        filename,
        fs.existsSync(filepath)
          ? `export { default } from ${JSON.stringify(filepath)}`
          : `export default function () {}`
      )
      manifest.push(destPath)
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
