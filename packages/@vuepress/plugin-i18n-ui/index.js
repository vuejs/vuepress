const path = require('path')

module.exports = (pluginOptions = {}, context) => ({
  name: 'i18n-ui',

  // This plugin will be enabled only at development mode.
  enabled: !context.isProd,

  enhanceAppFiles: [
    path.resolve(__dirname, 'client.js')
  ],

  additionalPages: [
    {
      filePath: path.resolve(__dirname, 'index.md'),
      permalink: pluginOptions.permalink || '/i18n/'
    }
  ]
})
