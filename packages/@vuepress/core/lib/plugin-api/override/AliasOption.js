'use strict'

/**
 * Module dependencies.
 */

const Option = require('../abstract/Option')

/**
 * define option.
 */

module.exports = class DefineOption extends Option {
  apply (config) {
    super.syncApply()
    const aliases = this.appliedValues
    aliases.forEach((alias) => {
      Object.keys(alias).forEach(key => {
        config.resolve.alias.set(key, alias[key])
      })
    })
  }
}
