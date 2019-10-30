const get = require('lodash/get')

const GROUP_NAME = 'Browser Compatibility'

module.exports = data => ([
  {
    name: 'evergreen',
    type: 'confirm',
    message: 'Evergreen',
    description: 'Set to true if you are only targeting evergreen browsers. This will disable ES5 transpilation and polyfills for IE, and result in faster builds and smaller files.',
    link: 'https://vuepress.vuejs.org/config/#evergreen',
    group: GROUP_NAME,
    value: get(data, 'config.evergreen'),
    default: false
  }
])
