const Option = require('../Option')
const { writeTemp } = require('../../prepare/util')

module.exports = class GlobalUIComponentsOption extends Option {
  async run () {
    writeTemp(
      `dynamic-modules/global-ui.js`,
      `export default ${JSON.stringify(this.values, null, 2)}`
    )
  }
}
