module.exports = (options, context) => ({
  enhanceAppFiles: [
    context.resolve(__dirname, 'client.js')
  ],

  globalUIComponents: 'BackToTop'
})
