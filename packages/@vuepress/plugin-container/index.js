const container = require('markdown-it-container')

function call (target, ...args) {
  if (typeof target === 'function') {
    return target(...args)
  } else {
    return target
  }
}

module.exports = (options, context) => ({
  multiple: true,

  extendMarkdown (md) {
    const { type, validate, marker, before, after } = options
    let { render } = options

    if (!type) return
    if (!render) {
      if (before !== undefined && after !== undefined) {
        render = (tokens, index) => {
          const token = tokens[index]
          return token.nesting === 1 ? call(before, token) : call(after, token)
        }
      } else {
        const defaultTitle = options.defaultTitle || type.toUpperCase()
        render = (tokens, index) => {
          const token = tokens[index]
          const title = token.info.trim().slice(type.length).trim() || defaultTitle
          if (token.nesting === 1) {
            return `<div class="${type} custom-block"><p class="custom-block-title">${title}</p>\n`
          } else {
            return `</div>\n`
          }
        }
      }
    }

    md.use(container, type, { render, validate, marker })
  }
})
