module.exports = (options = {}, {
  isProd,
  resolve
}) => ({
  name: 'i18n-ui',
  // Only use this plugin at development mode.
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
