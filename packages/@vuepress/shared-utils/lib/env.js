class ENV {
  constructor () {
    this.isDebug = false
    this.isTest = false
    this.isProduction = false
  }

  setOptions (options) {
    Object.assign(this, options)
  }
}

module.exports = new ENV()

