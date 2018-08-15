const Option = require('../Option')

module.exports = class AdditionalPagesOption extends Option {
  tap (pluginName, value) {
    if (typeof value === 'function') {
      value = value()
    }
    super.tap(pluginName, value)
  }
}
