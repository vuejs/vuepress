module.exports = class Hook {
  constructor (name) {
    this.name = name
    this.handlers = []
  }

  tap (symbol, handler) {
    if (typeof handler !== 'function') {
      return
    }
    this.handlers.push({ symbol, handler })
    return this
  }

  remove (symbol) {
    const index = this.handlers.findIndex(item => item.symbol === symbol)
    if (index !== -1) {
      this.handlers.splice(index, 1)
    }
    return this
  }

  async run () {
    for (const item of this.handlers) {
      await item.handler.apply(null, arguments)
    }
  }
}
