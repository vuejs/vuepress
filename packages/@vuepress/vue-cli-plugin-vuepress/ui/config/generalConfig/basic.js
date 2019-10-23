const { required } = require('../validators')

const GROUP_NAME = 'Basic settings'

module.exports = data => ([
  {
    name: 'base',
    type: 'input',
    message: 'Base',
    description: 'The base URL the site will be deployed at. You will need to set this if you plan to deploy your site under a sub path, for example, GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/, then you should set base to "/bar/". It should always start and end with a slash.The base is automatically prepended to all the URLs that start with / in other options, so you only need to specify it once.',
    link: 'https://vuepress.vuejs.org/config/#base',
    group: GROUP_NAME,
    value: data.config.base,
    default: '/'
  },
  {
    name: 'title',
    type: 'input',
    message: 'Title',
    description: 'Title for the site.',
    link: 'https://vuepress.vuejs.org/config/#title',
    group: GROUP_NAME,
    value: data.config.title,
    validate: required
  },
  {
    name: 'description',
    type: 'input',
    message: 'Description',
    description: 'Description for the site.',
    link: 'https://vuepress.vuejs.org/config/#description',
    group: GROUP_NAME,
    value: data.config.description,
    validate: required
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
    default: '8080'
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
    name: 'theme',
    type: 'list',
    message: 'VuePress theme',
    description: 'Select a VuePress theme you want to use. ⚠️ Notice that selecting a new theme will download it from npm registry.',
    default: null,
    choices: [
      {
        name: 'Default theme',
        value: null
      }
    ],
    link: 'https://vuepress.vuejs.org/theme/using-a-theme.html',
    group: GROUP_NAME,
    value: data.config.theme
  }
])
