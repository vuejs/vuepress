const Option = require('../Option')

module.exports = class ExtendPageDataOption extends Option {
  async apply (args) {
    const { data } = args
    for (const fn of this.values) {
      const res = await fn(args)
      if (typeof res === 'object') {
        Object.assign(data, res)
      }
    }
  }
}
