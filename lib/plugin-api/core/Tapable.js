module.exports = class Tapable {
  constructor (key) {
    this.key = key
    this.items = [] // Array<{ value: T, name: string }>
  }

  /**
   * set value with name.
   * @param {string} name
   * @param {any} value
   */
  tap (name, value) {
    if (Array.isArray(value)) {
      this.items.push(value.map(i => ({ value: i, name })))
    }
    this.items.push({ value, name })
  }

  /**
   * get values.
   * @returns {Array<T>}
   */
  get values () {
    return this.items.map(item => item.value)
  }

  /**
   * execute in serial
   * @param args
   * @returns {Promise.<void>}
   */
  async run (...args) {
    for (const fn of this.values) {
      await fn(...args)
    }
  }

  /**
   * execute in parallel
   * @param args
   * @returns {Promise.<void>}
   */
  async parallelRun (...args) {
    return await Promise.all(this.values.map(fn => fn(...args)))
  }
}
