// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. converting internal links to <router-link>

module.exports = (md, externalAttrs) => {
  let hasOpenRouterLink = false

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex]
      const href = link[1]
      const isExternal = /^https?:/.test(href)
      const isSourceLink = /(\/|\.md|\.html)(#.*)?$/.test(href)
      if (isExternal) {
        Object.entries(externalAttrs).forEach(([key, val]) => {
          token.attrSet(key, val)
        })

        if (/_blank/i.test(externalAttrs['target'])) {
          // add OutBoundLink to content if it opens in _blank
          tokens[idx + 1].type = 'html_block'
          tokens[idx + 1].content += '<OutboundLink/>'
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

    // convert link to filename and export it for existence check
    const links = md.__data.links || (md.__data.links = [])
    links.push(to)

    to = to
      .replace(/\.md$/, '.html')
      .replace(/\.md(#.*)$/, '.html$1')
    // normalize links to README/index
    if (/^index|readme\.html/i.test(to)) {
      to = '/'
    }
    // markdown-it encodes the uri
    link[1] = decodeURI(to)
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
