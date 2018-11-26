const highlight = require('./highlight')
const highlightLines = require('./highlightLines')
const preWrapper = require('./preWrapper')
const lineNumbers = require('./lineNumbers')
const component = require('./component')
const hoistScriptStyle = require('./hoist')
const convertRouterLink = require('./link')
const containers = require('./containers')
const snippet = require('./snippet')
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const _slugify = require('./slugify')
const { parseHeaders } = require('../util/parseHeaders')

module.exports = ({ markdown = {}} = {}) => {
  // allow user config slugify
  const slugify = markdown.slugify || _slugify

  const md = require('markdown-it')(Object.assign({
    html: true,
    highlight
  }, markdown))
    // custom plugins
    .use(component)
    .use(highlightLines)
    .use(preWrapper)
    .use(snippet)
    .use(convertRouterLink, Object.assign({
      target: '_blank',
      rel: 'noopener noreferrer'
    }, markdown.externalLinks))
    .use(hoistScriptStyle)
    .use(containers)

    // 3rd party plugins
    .use(emoji)
    .use(anchor, Object.assign({
      slugify,
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#'
    }, markdown.anchor))
    .use(toc, Object.assign({
      slugify,
      includeLevel: [2, 3],
      format: parseHeaders
    }, markdown.toc))

  // apply user config
  if (markdown.config) {
    markdown.config(md)
  }

  if (markdown.lineNumbers) {
    md.use(lineNumbers)
  }

  module.exports.dataReturnable(md)

  // expose slugify
  md.slugify = slugify

  return md
}

module.exports.dataReturnable = function dataReturnable (md) {
  // override render to allow custom plugins return data
  const render = md.render
  md.render = (...args) => {
    md.__data = {}
    const html = render.call(md, ...args)
    return {
      html,
      data: md.__data
    }
  }
}
