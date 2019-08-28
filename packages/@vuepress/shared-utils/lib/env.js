class ENV {
  constructor () {
    this.isDebug = false
    this.isTest = process.env.NODE_ENV === 'test' || false
    this.isProduction = false
  }

  setOptions (options) {
    Object.assign(this, options)
  }
}

module.exports = new ENV()
