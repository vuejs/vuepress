'use strict'

/**
 * Module dependencies.
 */

const Option = require('../abstract/Option')

/**
 * globalUIComponents option.
 */

module.exports = class GlobalUIComponentsOption extends Option {
  async apply (ctx) {
    await ctx.writeTemp(
      `internal/global-ui.js`,
      `export default ${JSON.stringify(this.values, null, 2)}`
    )
  }
}
