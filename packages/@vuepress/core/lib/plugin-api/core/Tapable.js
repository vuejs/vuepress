module.exports = class Tapable {
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
   * When T is function, eecute all functions in serial
   * @param args
   * @returns {Promise.<void>}
   */
  async run (...args) {
    for (const fn of this.values) {
      await fn(...args)
    }
  }

  /**
   * When T is function, eecute all functions in parallel
   * @param args
   * @returns {Promise.<void>}
   */
  async parallelRun (...args) {
    return await Promise.all(this.values.map(fn => fn(...args)))
  }
}
