const highlight = require('./highlight')
const highlightLines = require('./highlightLines')
const component = require('./component')
const hoistScriptStyle = require('./hoist')
const convertRouterLink = require('./link')
const containers = require('./containers')
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')

module.exports = ({ markdown = {}}) => {
  const md = require('markdown-it')({
    html: true,
    typographer: true,
    highlight
  })
    // custom plugins
    .use(component)
    .use(highlightLines)
    .use(convertRouterLink)
    .use(hoistScriptStyle)
    .use(containers)

    // 3rd party plugins
    .use(emoji)
    .use(anchor, Object.assign({
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#'
    }, markdown.anchor))
    .use(toc, Object.assign({
      includeLevel: [2, 3]
    }, markdown.toc))

  // apply user config
  if (markdown.config) {
    markdown.config(md)
  }

  return md
}
