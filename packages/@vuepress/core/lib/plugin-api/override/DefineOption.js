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
    const defines = this.appliedValues
    defines.forEach(define => {
      Object.keys(define).forEach(key => {
        define[key] = JSON.stringify(define[key])
      })
      config.plugin('injections').tap(([options]) => [
        Object.assign(options, define)
      ])
    })
  }
}
