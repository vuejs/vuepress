module.exports = class AbstractAPI {
  constructor (name) {
    this.name = name
    this.items = []  // Array<T>
  }

  add (value, pluginName) {
    this.items.push({
      value,
      pluginName
    })
  }

  get values () {
    return this.items.map(item => item.value)
  }

  async run () {

  }
}
