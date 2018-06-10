const path = require('path')
const { writeTemp } = require('../prepare/util')

class PluginContext {
  constructor (options) {
    Object.defineProperty(this, '_options', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: options
    })
  }

  get sourceDir () {
    return this._options.sourceDir
  }

  get outDir () {
    return this._options.outDir
  }

  get themePath () {
    return this._options.themePath
  }

  get publicPath () {
    return this._options.publicPath
  }
}

Object.assign(PluginContext.prototype, {
  resolve: path.resolve,
  writeTemp
})

module.exports = PluginContext
