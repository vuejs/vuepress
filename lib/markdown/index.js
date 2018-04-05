const highlight = require('./highlight')
const convertRouterLink = require('./link')
const anchor = require('markdown-it-anchor')
const container = require('markdown-it-container')
const toc = require('markdown-it-table-of-contents')

// TODO allow configuring markdown behavior
// TODO extract <style> blocks and <script> blocks
// TODO support inline demo

module.exports = ({ markdown = {}}) => {
  return require('markdown-it')({
    html: true,
    typographer: true,
    highlight
  })
    .use(convertRouterLink)
    .use(anchor, Object.assign({ permalink: true, permalinkBefore: true }, markdown.anchor))
    .use(toc, Object.assign({ includeLevel: [2, 3] }, markdown.toc))
    .use(container, 'tip')
    .use(container, 'warning')
    .use(container, 'danger')
}
