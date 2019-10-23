
const get = require('lodash/get')

const GROUP_NAME = 'Search box'

module.exports = data => ([
  {
    name: 'themeConfig.search',
    type: 'confirm',
    message: 'Show search box',
    description: 'Show the search box globally.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#built-in-search',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.search'),
    default: true
  },
  {
    name: 'themeConfig.searchMaxSuggestions',
    type: 'input',
    message: 'Max suggestions',
    description: 'Allows to customize how many suggestions will be shown in the search box.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#built-in-search',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.searchMaxSuggestions'),
    default: '5'
  },
  {
    name: 'themeConfig.searchPlaceholder',
    type: 'input',
    message: 'Search placeholder',
    description: 'Define a placeholder for the search box.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#search-placeholder',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.searchPlaceholder'),
    default: ''
  }
])

