const generalConfig = require('./generalConfig')
const defaultThemeConfig = require('./defaultThemeConfig')

module.exports = ({ data }) => ({
  prompts: [
    generalConfig,
    defaultThemeConfig
  ].flatMap(getConfig => getConfig(data))
})
