const generalConfig = require('./generalConfig')
const defaultThemeConfig = require('./defaultThemeConfig')

module.exports = ({ data }) => ({
  tabs: [
    {
      id: 'generalConfig',
      label: 'General settings',
      icon: 'settings_applications',
      prompts: [
        generalConfig
      ].flatMap(getConfig => getConfig(data))
    },
    {
      id: 'defaultThemeConfig',
      label: 'Theme settings',
      icon: 'palette',
      prompts: [
        defaultThemeConfig
      ].flatMap(getConfig => getConfig(data))
    }
  ]
})
