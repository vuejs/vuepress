const { path } = require('@vuepress/shared-utils')

/**
 * @type {import('@vuepress/types').Plugin}
 */
module.exports = {
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js')
  ],

  globalUIComponents: 'BackToTop'
}
