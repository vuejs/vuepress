const get = require('lodash/get')

const { isJSON } = require('../validators')

const GROUP_NAME = 'Markdown settings'

module.exports = data => ([
  {
    name: 'markdown.lineNumbers',
    type: 'confirm',
    message: 'Display line numbers for code blocks',
    description: 'Whether to show line numbers to the left of each code blocks.',
    link: 'https://vuepress.vuejs.org/config/#markdown-linenumbers',
    group: GROUP_NAME,
    value: get(data, 'config.markdown.lineNumbers'),
    default: undefined
  },
  {
    name: 'markdown.toc',
    type: 'editor',
    message: 'Table of contents options',
    description: 'Options for markdown-it-table-of-contents (Note: prefer markdown.slugify to customize header ids).',
    link: 'https://vuepress.vuejs.org/config/#markdown-toc',
    group: GROUP_NAME,
    value: get(data, 'config.markdown.toc'),
    validate: isJSON,
    transform: JSON.parse,
    default: `{
  "includeLevel": [2, 3]
}`
  }
])
