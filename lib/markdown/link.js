// markdown-it plugin for:
// 1. adding target="_blank" and rel="noopener noreferrer" to external links
//    (if opts.blank is true)
// 2. converting internal links to <router-link>

module.exports = (md, opts) => {
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
        if (opts.blank) {
          addAttr(token, 'target', '_blank')
          addAttr(token, 'rel', 'noopener noreferrer')
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

function addAttr (token, name, val) {
  const targetIndex = token.attrIndex(name)
  if (targetIndex < 0) {
    token.attrPush([name, val])
  } else {
    token.attrs[targetIndex][1] = val
  }
}
