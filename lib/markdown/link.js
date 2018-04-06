// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. converting internal links to <router-link>

module.exports = md => {
  let hasOpenRouterLink = false

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex]
      const href = link[1]
      const isExternal = /^https?:/.test(href)
      const isSourceLink = /\.(md|html)(#[\w-]*)?$/.test(href)
      if (isExternal) {
        const targetIndex = token.attrIndex('target')
        if (targetIndex < 0) {
          token.attrPush(['target', '_blank'])
        } else {
          token.attrs[targetIndex][1] = '_blank'
        }
      } else if (isSourceLink) {
        hasOpenRouterLink = true
        tokens[idx] = toRouterLink(token, link)
      }
    }
    return self.renderToken(tokens, idx, options)
  }

  function toRouterLink (token, link) {
    link[0] = 'to'
    let to = link[1]
      .replace(/\.md$/, '.html')
      .replace(/\.md(#[\w-]*)/, '.html$1')
    // normalize links to README/index
    if (/^index|readme\.html/i.test(to)) {
      to = '/'
    }
    link[1] = to
    return Object.assign({}, token, {
      tag: 'router-link'
    })
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (hasOpenRouterLink) {
      token.tag = 'router-link'
      hasOpenRouterLink = false
    }
    return self.renderToken(tokens, idx, options)
  }
}
