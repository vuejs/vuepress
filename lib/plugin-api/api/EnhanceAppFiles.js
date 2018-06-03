const fs = require('fs-extra')
const path = require('path')
const AbstractAPI = require('./AbstractAPI')
const { writeTemp } = require('../../prepare/util')

module.exports = class EnhanceAppFilesAPI extends AbstractAPI {
  async run (...args) {
    const manifest = []
    const items = this.resolveItems()

    for (const [index, { filepath }] of items.entries()) {
      if (fs.existsSync(filepath)) {
        let filename = path.parse(filepath).base
        filename = `enhanceAppFiles-${index}.js`
        const destPath = await writeTemp(
          filename,
          `export { default } from ${JSON.stringify(filepath)}`
        )
        manifest.push(destPath)
      }
    }

    await writeTemp(
      'appEnhancers.js',
      this.getEnhanceAppCode(manifest)
    )
  }

  /**
   * Don't resolve items via overriding 'add' is due to
   * we want to delay the execution of the function.
   * @returns {Array}
   */
  resolveItems () {
    const items = []
    this.items.forEach(({ value, pluginName }) => {
      if (typeof value === 'function') {
        value = value()
      }
      items.push(...value.map(filepath => ({
        pluginName,
        filepath
      })))
    })
    return items
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
