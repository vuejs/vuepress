export default {
  set (itemName, item) {
    sessionStorage.setItem(itemName, JSON.stringify(item))
  },
  get (itemName) {
    let item
    try {
      item = JSON.parse(sessionStorage.getItem(itemName))
    } catch (err) {
      item = null
    }
    return item
  },
  clear (itemName) {
    sessionStorage.removeItem(itemName)
  }
}
