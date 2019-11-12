const generalConfig = require('./generalConfig')
const markdownConfig = require('./markdownConfig')
const defaultThemeConfig = require('./defaultThemeConfig')

module.exports = () => ({ data }) => {
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
      id: 'themeConfig',
      label: 'Theme',
      icon: 'palette',
      prompts: [
        defaultThemeConfig
      ]
    }
  ]

  tabs.forEach(tab => {
    tab.prompts = tab.prompts.flatMap(getConfig => getConfig(data))
  })

  return { tabs }
}
