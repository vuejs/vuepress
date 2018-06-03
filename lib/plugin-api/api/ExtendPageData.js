const AbstractAPI = require('./AbstractAPI')

module.exports = class enhanceAppFiles extends AbstractAPI {
  async run (args) {
    const { data } = args
    for (const fn of this.values) {
      // TODO handle error
      const res = await fn(args)
      if (typeof res === 'object') {
        Object.assign(data, res)
      }
    }
  }
}
