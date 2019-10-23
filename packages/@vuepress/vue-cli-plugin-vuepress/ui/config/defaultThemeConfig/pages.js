const get = require('lodash/get')

const GROUP_NAME = 'Pages settings'

module.exports = data => ([
  {
    name: 'themeConfig.lastUpdated',
    type: 'input',
    message: 'Last updated',
    description: 'This option allows you to get the UNIX timestamp(ms) of each file’s last git commit, and it will also be displayed at the bottom of each page in an appropriate format. Enter the string that will be displayed as a prefix (example: \'Last updated\')',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#last-updated',
    group: GROUP_NAME,
    value: get(data, 'config.themeConfig.lastUpdated')
  },
  {
    name: 'themeConfig.repo',
    type: 'input',
    message: 'Github/Gitlab/Bitbucket repository',
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
  }
])
