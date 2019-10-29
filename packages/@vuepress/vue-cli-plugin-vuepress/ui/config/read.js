const generalConfig = require('./generalConfig')
const defaultThemeConfig = require('./defaultThemeConfig')
const markdownConfig = require('./markdownConfig')

module.exports = ({ data }) => {
  const tabs = [
    {
      id: 'generalConfig',
      label: 'General',
      icon: 'settings_applications',
      prompts: [generalConfig]
    },
    {
      id: 'markdownConfig',
      label: 'Markdown',
      icon: 'edit',
      prompts: [markdownConfig]
    },
    {
      id: 'defaultThemeConfig',
      label: 'Theme',
      icon: 'palette',
      prompts: [defaultThemeConfig]
    }
  ]

  tabs.forEach(tab => {
    tab.prompts = tab.prompts.flatMap(getConfig => getConfig(data))
  })

  return { tabs }
}
