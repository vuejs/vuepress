const get = require('lodash/get')

const GROUP_NAME = 'Navbar settings'

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
  },
  {
    name: 'themeConfig.logo',
    type: 'input',
    message: 'Logo path',
    description: 'You can add a logo to the navbar. Logo can be placed in public folder.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#navbar-logo',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.logo')
  }
])
