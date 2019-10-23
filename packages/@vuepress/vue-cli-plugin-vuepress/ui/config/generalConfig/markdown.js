const get = require('lodash/get')

const GROUP_NAME = 'Markdown settings'

module.exports = data => ([
  {
    name: 'markdown.lineNumbers',
    type: 'confirm',
    message: 'Display line numbers',
    description: 'Whether to show line numbers to the left of each code blocks.',
    link: 'https://vuepress.vuejs.org/config/#markdown-linenumbers',
    group: GROUP_NAME,
    value: get(data, 'config.markdown.lineNumbers'),
    default: undefined
  }
])
