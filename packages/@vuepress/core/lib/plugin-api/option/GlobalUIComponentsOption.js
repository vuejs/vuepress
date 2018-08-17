const Option = require('../Option')
const { writeTemp } = require('@vuepress/shared-utils')

module.exports = class GlobalUIComponentsOption extends Option {
  async apply () {
    await writeTemp(
      `dynamic/global-ui.js`,
      `export default ${JSON.stringify(this.values, null, 2)}`
    )
  }
}
