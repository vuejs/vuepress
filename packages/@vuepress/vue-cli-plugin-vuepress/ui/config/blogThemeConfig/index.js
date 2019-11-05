const { isBlogTheme } = require('../utils')

module.exports = data => {
  const promptItems = [
    // TODO
  ]

  return promptItems.map(item => ({
    when: isBlogTheme,
    ...item
  }))
}
