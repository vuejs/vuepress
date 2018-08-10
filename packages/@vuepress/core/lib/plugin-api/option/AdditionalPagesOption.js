const Tapable = require('../core/Tapable')

module.exports = class AdditionalPagesOption extends Tapable {
  tap (pluginName, value) {
    if (typeof value === 'function') {
      value = value()
    }
    super.tap(pluginName, value)
  }
}
