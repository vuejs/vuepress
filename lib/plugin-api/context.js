module.exports = class PluginContext {
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
}
