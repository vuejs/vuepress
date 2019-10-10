const get = require('lodash/get')

const isDefaultTheme = answer => answer.theme === null

module.exports = data => ([
  {
    when: isDefaultTheme,
    name: 'themeConfig.navbar',
    type: 'confirm',
    message: 'Navbar',
    description: 'Disable the navbar globally.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#disable-the-navbar',
    group: 'Theme settings',
    value: get(data, 'config.themeConfig.navbar'),
    default: true
  }
])
