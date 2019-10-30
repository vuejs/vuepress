const flattenDeep = require('lodash/flattenDeep')

const navbarItems = require('./navbarItems')
const sidebar = require('./sidebar')
const navigation = require('./navigation')
const searchBox = require('./searchBox')
const pages = require('./pages')
const { isDefaultTheme } = require('./utils')

module.exports = data => {
  const promptItems = flattenDeep([
    navigation(data),
    navbarItems(data),
    sidebar(data),
    searchBox(data),
    pages(data)
  ])

  return promptItems.map(item => ({
    when: isDefaultTheme,
    ...item
  }))
}
