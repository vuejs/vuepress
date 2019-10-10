const { required } = require('./validators')

module.exports = data => ([
  {
    name: 'title',
    type: 'input',
    message: 'Title',
    description: 'Title for the site.',
    link: 'https://vuepress.vuejs.org/config/#title',
    group: 'General settings',
    value: data.config.title,
    validate: required
  },
  {
    name: 'description',
    type: 'input',
    message: 'Description',
    description: 'Description for the site.',
    link: 'https://vuepress.vuejs.org/config/#description',
    group: 'General settings',
    value: data.config.description,
    validate: required
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
    group: 'General settings',
    value: data.config.theme
  }
])
