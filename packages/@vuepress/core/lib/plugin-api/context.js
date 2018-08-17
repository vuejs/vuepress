const path = require('path')
const { writeTemp } = require('@vuepress/shared-utils')

class PluginContext {
  constructor (options) {
    Object.defineProperty(this, '_options', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: options
    })
  }

  get base () {
    return this._options.siteConfig.base
  }

  get isProd () {
    return this._options.isProd
  }

  get sourceDir () {
    return this._options.sourceDir
  }

  get publicDir () {
    path.resolve(this.sourceDir, '.vuepress/public')
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

  get themeConfig () {
    return this._options.themeConfig
  }

  get siteConfig () {
    return this._options.siteConfig
  }

  get siteData () {
    return this._options.siteData
  }

  get self () {
    return this._options.self
  }
}

Object.assign(PluginContext.prototype, {
  resolve: path.resolve,
  writeTemp
})

module.exports = PluginContext
