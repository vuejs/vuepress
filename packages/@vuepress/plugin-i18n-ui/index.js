const { path } = require('@vuepress/shared-utils')

module.exports = (pluginOptions = {}, context) => ({
  name: 'i18n-ui',

  // This plugin will be enabled only at development mode.
  enabled: !context.isProd,

  enhanceAppFiles: [
    path.resolve(__dirname, 'client.js')
  ],

  additionalPages: [
    {
      permalink: pluginOptions.permalink || '/i18n/',
      frontmatter: {
        'layout': 'I18nUILayout'
      }
    }
  ]
})
