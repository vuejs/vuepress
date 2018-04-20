const highlight = require('./highlight')
const highlightLines = require('./highlightLines')
const component = require('./component')
const hoistScriptStyle = require('./hoist')
const convertRouterLink = require('./link')
const containers = require('./containers')
const emoji = require('markdown-it-emoji')
const anchor = require('markdown-it-anchor')
const toc = require('markdown-it-table-of-contents')
const _slugify = require('./slugify')

module.exports = ({ markdown = {}} = {}) => {
  // allow user config slugify
  const slugify = markdown.slugify || _slugify

  const md = require('markdown-it')({
    html: true,
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
      slugify,
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '#'
    }, markdown.anchor))
    .use(toc, Object.assign({
      slugify,
      includeLevel: [2, 3]
    }, markdown.toc))

  // apply user config
  if (markdown.config) {
    markdown.config(md)
  }

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

  // expose slugify
  md.slugify = slugify

  return md
}
