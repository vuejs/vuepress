module.exports = (pluginOptions = {}, context) => ({
  name: 'i18n-ui',

  // This plugin will be enabled only at development mode.
  enabled: !context.isProd,

  enhanceAppFiles: [
    context.resolve(__dirname, 'client.js')
  ],

  additionalPages: [
    {
      override: false,
      route: pluginOptions.route || '/i18n/',
      path: context.resolve(__dirname, 'index.md')
    }
  ]
})
