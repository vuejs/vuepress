const path = require('path')

module.exports = (options, context) => ({
  enhanceAppFiles: [
    path.resolve(__dirname, 'client.js')
  ],

  globalUIComponents: 'BackToTop'
})
