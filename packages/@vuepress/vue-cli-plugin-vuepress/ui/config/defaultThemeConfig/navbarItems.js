const times = require('lodash/times')
const get = require('lodash/get')

const isNavBarVisible = answer => answer.themeConfig.navbar === true
const isPreviousLinkDefined = (answer, previousLinkIndex) => previousLinkIndex === -1
|| (
  get(answer, `themeConfig.nav[${previousLinkIndex}].text`)
  && get(answer, `themeConfig.nav[${previousLinkIndex}].link`)
)

const NAVLINKS_GROUP_NAME = 'Navbar items'
const NAVBAR_LINKS_COUNT = 10

module.exports = data => times(NAVBAR_LINKS_COUNT, count => {
  const shouldDisplayItem = answer => isNavBarVisible(answer)
  && isPreviousLinkDefined(answer, count - 1)

  return [{
    when: shouldDisplayItem,
    name: `themeConfig.nav.${count}.text`,
    type: 'input',
    message: `Item ${count + 1}: text`,
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#navbar',
    group: NAVLINKS_GROUP_NAME,
    value: get(data, `config.themeConfig.nav[${count}].text`)
  }, {
    when: shouldDisplayItem,
    name: `themeConfig.nav.${count}.link`,
    type: 'input',
    message: `Item ${count + 1}: link`,
    description: 'This is the targeted page. Can be both external (example: https://vuepress.vuejs.org) or internal (example: /my/page/path) URL.',
    link: 'https://vuepress.vuejs.org/theme/default-theme-config.html#navbar',
    group: NAVLINKS_GROUP_NAME,
    value: get(data, `config.themeConfig.nav[${count}].link`)
  }]
})
