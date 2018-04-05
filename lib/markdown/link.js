module.exports = md => {
  let hasOpenLink = false

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex]
      const href = link[1]
      if (!/^https?:/.test(href) && /\.(md|html)$/.test(href)) {
        hasOpenLink = true
        tokens[idx] = toRouterLink(token, link)
      }
    }
    return self.renderToken(tokens, idx, options)
  }

  function toRouterLink (token, link) {
    link[0] = 'to'
    link[1] = link[1].replace(/\.md$/, '.html')
    return Object.assign({}, token, {
      tag: 'router-link'
    })
  }

  md.renderer.rules.link_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    if (hasOpenLink) {
      token.tag = 'router-link'
      hasOpenLink = false
    }
    return self.renderToken(tokens, idx, options)
  }
}
