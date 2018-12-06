'use strict'

const AsyncOption = require('../abstract/AsyncOption')

/**
 * additionalPages option.
 */

module.exports = class AdditionalPagesOption extends AsyncOption {
  async apply (ctx) {
    await super.asyncApply()

    await Promise.all(
      this.appliedValues.map(async (options) => {
        await ctx.addPage(options)
      })
    )
  }
}
