const { path } = require('@vuepress/shared-utils')

module.exports = {
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js')
  ],

  globalUIComponents: 'BackToTop'
}
