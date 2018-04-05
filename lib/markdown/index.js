const highlight = require('./highlight')
const convertRouterLink = require('./link')
const anchor = require('markdown-it-anchor')
const container = require('markdown-it-container')

// TODO allow configuring markdown behavior
// TODO extract <style> blocks and <script> blocks
// TODO support inline demo

module.exports = siteConfig => {
  return require('markdown-it')({
    html: true,
    typographer: true,
    highlight
  })
  .use(convertRouterLink)
  .use(anchor, { permalink: true, permalinkBefore: true })
  .use(container, 'tip')
  .use(container, 'warning')
  .use(container, 'danger')
}
