const container = require('markdown-it-container')

module.exports = (options = {}, context) => ({
  name: 'container',
  multiple: true,

  extendMarkdown: md => {
    md.use(container, 'v-pre', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? `<div v-pre>\n`
        : `</div>\n`
    })
  }
})
