module.exports = class AbstractAPI {
  constructor (name) {
    this.name = name
    this.items = []  // Array<T>
  }

  add (value) {
    this.items.push(value)
  }

  remove (index) {
    this.items.splice(index, 1)
  }

  async run () {

  }
}
