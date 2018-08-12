module.exports = (options, context) => ({
  name: 'back-to-top',

  enhanceAppFiles: [
    context.resolve(__dirname, 'client.js')
  ],

  globalUIComponents: 'BackToTop'
})
