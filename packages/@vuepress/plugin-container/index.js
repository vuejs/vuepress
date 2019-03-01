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
    const {
      validate,
      marker,
      before,
      after,
      type = '',
      defaultTitle = type.toUpperCase()
    } = options
    if (!type) return

    let { render } = options
    if (!render) {
      if (before !== undefined && after !== undefined) {
        render = (tokens, index) => {
          const token = tokens[index]
          return token.nesting === 1 ? call(before, token) : call(after, token)
        }
      } else {
        render = (tokens, index) => {
          const token = tokens[index]
          let title = token.info.trim().slice(type.length).trim() || defaultTitle
          if (title) title = `<p class="custom-block-title">${title}</p>`
          if (token.nesting === 1) {
            return `<div class="${type} custom-block">${title}\n`
          } else {
            return `</div>\n`
          }
        }
      }
    }

    md.use(container, type, { render, validate, marker })
  }
})
