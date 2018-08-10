const Tapable = require('../core/Tapable')

module.exports = class ExtendPageDataOption extends Tapable {
  async run (args) {
    const { data } = args
    for (const fn of this.values) {
      const res = await fn(args)
      if (typeof res === 'object') {
        Object.assign(data, res)
      }
    }
  }
}
