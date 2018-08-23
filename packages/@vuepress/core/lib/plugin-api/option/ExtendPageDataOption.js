const Option = require('../Option')

module.exports = class ExtendPageDataOption extends Option {
  async apply (data) {
    for (const fn of this.values) {
      const res = await fn(data)
      if (typeof res === 'object') {
        Object.assign(data, res)
      }
    }
  }
}
