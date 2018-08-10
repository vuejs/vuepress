module.exports = (options = {}, {
  isProd,
  resolve
}) => ({
  name: 'i18n-ui',
  // This plugin will be enabled only at development mode.
  enabled: !isProd,
  enhanceAppFiles: [
    resolve(__dirname, 'client.js')
  ],
  additionalPages: [
    {
      override: false,
      route: options.route || '/i18n-ui/',
      path: resolve(__dirname, 'index.md')
    }
  ]
})
