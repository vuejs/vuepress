const get = require('lodash/get')

const { isJSON } = require('../validators')
const { getJSONObj } = require('../utils')

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
    message: 'Table of contents',
    description: 'Options for markdown-it-table-of-contents (Note: prefer markdown.slugify to customize header ids).',
    link: 'https://vuepress.vuejs.org/config/#markdown-toc',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.markdown.toc'),
    validate: isJSON,
    transform: JSON.parse,
    default: `{
  "includeLevel": [2, 3]
}`
  },
  {
    name: 'markdown.anchor',
    type: 'editor',
    message: 'Anchor',
    description: 'Options for markdown-it-anchor. (Note: prefer markdown.slugify to customize header ids.)',
    link: 'https://vuepress.vuejs.org/config/#markdown-anchor',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.markdown.anchor'),
    validate: isJSON,
    transform: JSON.parse,
    default: `{
  "permalink": true,
  "permalinkBefore": true,
  "permalinkSymbol": "#"
}`
  },
  {
    name: 'markdown.externalLinks',
    type: 'editor',
    message: 'External links',
    description: "The key and value pair will be added to &lt;a&gt; tags that point to an external link. The default option will open external links in a new window.",
    link: 'https://vuepress.vuejs.org/config/#markdown-externallinks',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.markdown.externalLinks'),
    validate: isJSON,
    transform: JSON.parse,
    default: `{
  "target": "_blank",
  "rel": "noopener noreferrer"
}`
  },
  {
    name: 'markdown.extractHeaders',
    type: 'input',
    message: 'Extract headers',
    description: 'While preparing the page, headers are extracted from the Markdown file and stored in this.$page.headers. By default, VuePress will extract h2 and h3 elements for you. You can override the headers it pulls out in your markdown options.',
    link: 'https://vuepress.vuejs.org/config/#markdown-extractheaders',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.markdown.extractHeaders'),
    validate: isJSON,
    transform: JSON.parse,
    default: `["h2", "h3"]`
  }
])
