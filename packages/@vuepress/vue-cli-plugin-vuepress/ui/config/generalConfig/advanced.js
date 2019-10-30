const { isNumber, isJSON } = require('../validators')
const { getJSONObj } = require('../utils')

const GROUP_NAME = 'Advanced settings'

module.exports = data => ([
  {
    name: 'base',
    type: 'input',
    message: 'Base',
    description: 'The base URL the site will be deployed at.',
    link: 'https://vuepress.vuejs.org/config/#base',
    group: GROUP_NAME,
    value: data.config.base,
    default: '/'
  },
  {
    name: 'host',
    type: 'input',
    message: 'Host',
    description: 'Specify the host to use for the dev server.',
    link: 'https://vuepress.vuejs.org/config/#host',
    group: GROUP_NAME,
    value: data.config.host,
    default: '0.0.0.0'
  },
  {
    name: 'port',
    type: 'input',
    message: 'Port',
    description: 'Specify the port to use for the dev server.',
    link: 'https://vuepress.vuejs.org/config/#port',
    group: GROUP_NAME,
    value: data.config.port,
    default: '8080',
    validate: isNumber,
    transform: Number
  },
  {
    name: 'temp',
    type: 'input',
    message: 'Temp',
    description: 'Specify the temporary directory for client.',
    link: 'https://vuepress.vuejs.org/config/#temp',
    group: GROUP_NAME,
    value: data.config.temp
  },
  {
    name: 'dest',
    type: 'input',
    message: 'Dest',
    description: 'Specify the output directory for vuepress build. If a relative path is specified, it will be resolved based on process.cwd().',
    link: 'https://vuepress.vuejs.org/config/#dest',
    group: GROUP_NAME,
    value: data.config.dest
  },
  {
    name: 'cache',
    type: 'confirm',
    message: 'Cache',
    description: 'VuePress uses cache-loader by default to greatly speed up the compilation of webpack. You can use this option to specify the path to the cache, and can also remove the cache before each build by setting it to false.',
    link: 'https://vuepress.vuejs.org/config/#cache',
    group: GROUP_NAME,
    value: data.config.cache,
    default: true
  },
  {
    name: 'locales',
    type: 'editor',
    message: 'Locales',
    description: 'Specify locales for i18n support.',
    link: 'https://vuepress.vuejs.org/config/#locales',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.locales'),
    transform: JSON.parse,
    validate: isJSON,
    default: undefined
  },
  {
    name: 'head',
    type: 'editor',
    message: 'Head',
    description: 'Extra tags to inject into the page HTML &lt;head&gt;.',
    link: 'https://vuepress.vuejs.org/config/#head',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.head'),
    transform: JSON.parse,
    validate: isJSON,
    default: '[]'
  },
  {
    name: 'extraWatchFiles',
    type: 'editor',
    message: 'Watch extra files',
    description: 'Specify extra files to watch. You can watch any file if you want. File changes will trigger vuepress rebuilding and real-time updates.',
    link: 'https://vuepress.vuejs.org/config/#extrawatchfiles',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.extraWatchFiles'),
    transform: JSON.parse,
    validate: isJSON,
    default: '[]'
  },
  {
    name: 'patterns',
    type: 'input',
    message: 'Patterns',
    description: 'Specify which pattern of files you want to be resolved.',
    link: 'https://vuepress.vuejs.org/config/#extrawatchfiles',
    group: GROUP_NAME,
    value: getJSONObj(data, 'config.patterns'),
    transform: JSON.parse,
    validate: isJSON,
    default: `["**/*.md", "**/*.vue"]`
  }
])
