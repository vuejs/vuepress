const path = require('path')

module.exports = options => ({
  name: 'test',

  ready () {
    console.log('Ready')
  },

  extendPageData ({ content }) {
    return {
      size: (content.length / 1024).toFixed(2) + 'kb'
    }
  },

  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceApp.js')
  ]

})
