const Tapable = require('../core/Tapable')
const { writeTemp } = require('../../prepare/util')

module.exports = class GlobalUIComponentsOption extends Tapable {
  async run () {
    writeTemp(
      `dynamic-modules/global-ui.js`,
      `export default ${JSON.stringify(this.values, null, 2)}`
    )
  }
}
