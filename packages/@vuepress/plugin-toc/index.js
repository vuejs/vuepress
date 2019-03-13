const markdownTOC = require('./markdown')
const { path } = require('@vuepress/shared-utils')

module.exports = (options = {}, context) => ({
  extendMarkdown (md) {
    md.use(markdownTOC, options)
  },

  enhanceAppFiles: path.resolve(__dirname, 'enhanceApp.js')
})
