const Option = require('../Option')

module.exports = class GlobalUIComponentsOption extends Option {
  async apply (context) {
    await context.writeTemp(
      `internal/global-ui.js`,
      `export default ${JSON.stringify(this.values, null, 2)}`
    )
  }
}
