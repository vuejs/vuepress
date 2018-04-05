const highlight = require('./highlight')
const convertRouterLink = require('./link')
const container = require('markdown-it-container')

// TODO extract <style> blocks and <script> blocks
// TODO support inline demo

module.exports = require('markdown-it')({
  html: true,
  typographer: true,
  highlight
})
.use(convertRouterLink)
.use(container, 'tip')
.use(container, 'warning')
.use(container, 'danger')
