class Option {
  constructor (key) {
    this.key = key
    this.items = [] // Array<{ value: T, name: string }>
  }

  /**
   * Set value with name.
   * @param {string} name
   * @param {any} value
   */
  tap (name, value) {
    if (Array.isArray(value)) {
      return this.items.push(...value.map(i => ({ value: i, name })))
    }
    this.items.push({ value, name })
  }

  /**
   * Get values.
   * @returns {Array<T>}
   */
  get values () {
    return this.items.map(item => item.value)
  }

  /**
   * Synchronous running
   * @param {Array<Function>} args
   */
  syncApply (...args) {
    for (const fn of this.values) {
      fn(...args)
    }
  }

  /**
   * Asynchronous serial running
   * @param args
   * @param {Array<AsyncFunction>} args
   */
  async asyncApply (...args) {
    for (const fn of this.values) {
      await fn(...args)
    }
  }

  /**
   * Asynchronous serial running
   * @param args
   * @param {Array<AsyncFunction>} args
   */
  async parallelApply (...args) {
    return await Promise.all(this.values.map(fn => fn(...args)))
  }
}

Option.prototype.apply = Option.prototype.asyncApply
module.exports = Option
