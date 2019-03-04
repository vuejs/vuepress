'use strict'

/**
 * Module dependencies.
 */

const Option = require('../abstract/Option')

/**
 * alias option.
 */

module.exports = class AliasOption extends Option {
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
