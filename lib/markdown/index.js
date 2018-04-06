const highlight = require('./highlight')
const highlightLines = require('./highlightLines')
const convertRouterLink = require('./link')
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const container = require('markdown-it-container')
const toc = require('markdown-it-table-of-contents')

// TODO allow configuring markdown behavior
// TODO extract <style> blocks and <script> blocks
// TODO support inline demo

module.exports = ({ markdown = {}}) => {
  const md = require('markdown-it')({
    html: true,
    typographer: true,
    highlight
  })
    .use(convertRouterLink)
    .use(highlightLines)
    .use(emoji)
    .use(anchor, Object.assign({ permalink: true, permalinkBefore: true }, markdown.anchor))
    .use(toc, Object.assign({ includeLevel: [2, 3] }, markdown.toc))
    .use(container, 'tip')
    .use(container, 'warning')
    .use(container, 'danger')
    .use(container, 'v-pre', {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? `<div v-pre>\n`
        : `</div>\n`
    })

  if (markdown.config) {
    markdown.config(md)
  }

  return md
}
