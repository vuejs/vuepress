const get = require('lodash/get')

const GROUP_NAME = 'Sidebar settings'

module.exports = data => ([
  {
    name: 'themeConfig.sidebar',
    type: 'confirm',
    message: 'Auto sidebar for single pages',
    description: 'Automatically generate a sidebar that represent your pages structure.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#auto-sidebar-for-single-pages',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.sidebar')
  },
  {
    name: 'themeConfig.displayAllHeaders',
    type: 'confirm',
    message: 'Display header links of all pages',
    description: 'The sidebar only displays links for headers in the current active page. This option allow to display all header links for every page.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#displaying-header-links-of-all-pages',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.displayAllHeaders'),
    default: false
  },
  {
    name: 'themeConfig.activeHeaderLinks',
    type: 'confirm',
    message: 'Active Header Links',
    description: 'By default, the nested header links and the hash in the URL are updated as the user scrolls to view the different sections of the page. This behavior can be disabled/enabled with this option.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#active-header-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.activeHeaderLinks'),
    default: true
  }
])
