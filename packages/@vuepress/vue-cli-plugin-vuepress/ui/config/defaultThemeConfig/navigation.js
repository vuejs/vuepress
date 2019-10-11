const get = require('lodash/get')

const GROUP_NAME = 'Navigation settings'

module.exports = data => ([
  {
    name: 'themeConfig.navbar',
    type: 'confirm',
    message: 'Show navigation bar',
    description: 'Disable the navbar globally.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#disable-the-navbar',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.navbar'),
    default: true
  }
])
