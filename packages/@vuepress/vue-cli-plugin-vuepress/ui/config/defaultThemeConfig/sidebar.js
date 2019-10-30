const get = require('lodash/get')

const { isJSON } = require('../validators')
const { getJSONObj } = require('../utils')

const GROUP_NAME = 'Sidebar settings'

module.exports = data => ([
  {
    name: 'themeConfig.sidebar',
    type: 'editor',
    message: 'Sidebar links',
    description: 'The basic configuration expects an Array of links. You can find examples and more infos here:',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#sidebar',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.themeConfig.sidebar'),
    transform: (data) => data === 'auto' ? data : JSON.parse(data),
    validate: data => data === 'auto' || isJSON(data)
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
