const get = require('lodash/get')

const { emptyStringToUndefined } = require('../utils')

const GROUP_NAME = 'Pages settings'

module.exports = data => ([
  {
    name: 'themeConfig.lastUpdated',
    type: 'input',
    message: 'Last updated label',
    description: 'This option allows you to get the UNIX timestamp(ms) of each file’s last git commit, and it will also be displayed at the bottom of each page in an appropriate format. Enter the string that will be displayed as a prefix (example: \'Last updated\')',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#last-updated',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.lastUpdated')
  },
  {
    name: 'themeConfig.repo',
    type: 'input',
    message: 'Github/Gitlab/Bitbucket repository url',
    description: 'Auto generates a Github/Gitlab/Bitbucket link in the navbar and "Edit this page" links at the bottom of each page. (value example: "https://github.com/vuejs/vuepress")',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.repo')
  },
  {
    when: answer => get(answer, 'themeConfig.repo'),
    name: 'themeConfig.repoLabel',
    type: 'input',
    message: 'Repository label in navbar',
    description: 'Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on platform you\'re using',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.repoLabel')
  },
  {
    name: 'themeConfig.docsRepo',
    type: 'input',
    message: 'Github/Gitlab/Bitbucket documentation repository url',
    description: 'Use this field if your doc is in a different repo from your main project.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.docsRepo'),
    transform: emptyStringToUndefined
  },
  {
    when: answer => get(answer, 'themeConfig.docsRepo'),
    name: 'themeConfig.docsDir',
    type: 'input',
    message: 'Documentation directory',
    description: 'Use this if your documentation is not at the root of the repo',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.docsDir')
  },
  {
    when: answer => get(answer, 'themeConfig.docsRepo'),
    name: 'themeConfig.docsBranch',
    type: 'input',
    message: 'Documentation branch',
    description: "Use this field if your docs are in a specific branch (defaults to 'master')",
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.docsBranch'),
    default: 'master'
  },
  {
    name: 'themeConfig.editLinks',
    type: 'confirm',
    message: 'Edit links',
    description: 'Allows to display edit link on all pages',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.editLinks'),
    default: false
  },
  {
    when: answer => get(answer, 'themeConfig.editLinks'),
    name: 'themeConfig.editLinkText',
    type: 'input',
    message: 'Edit link text',
    description: 'Allows to custom text for edit links',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.editLinkText'),
    default: 'Edit this page'
  },
  {
    name: 'themeConfig.nextLinks',
    type: 'confirm',
    message: 'Next links',
    description: 'Allows to hide next page links on all pages',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.nextLinks'),
    default: true
  },
  {
    name: 'themeConfig.prevLinks',
    type: 'confirm',
    message: 'Prev links',
    description: 'Allows to hide prev page links on all pages',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#git-repository-and-edit-links',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.prevLinks'),
    default: true
  }
])
