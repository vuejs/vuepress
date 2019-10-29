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

  const OBJECT_PROPERTIES = [
    'config.markdown.toc'
  ]

  // When vue UI read the data source, we need to stringify object properties
  // so it can be properly displayed in vue UI inputs
  const getConfigData = getConfig => {
    OBJECT_PROPERTIES.forEach(prop => {
      data[prop] = JSON.stringify(data[prop])
    })

    return getConfig(data)
  }

  tabs.forEach(tab => {
    tab.prompts = tab.prompts.flatMap(getConfigData)
  })

  return { tabs }
}
