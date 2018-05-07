// markdown-it plugin for:
// 1. adding target="_blank" to external links
// 2. converting internal links to <router-link>
const querystring = require('querystring')

module.exports = md => {
  let hasOpenRouterLink = false

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const hrefIndex = token.attrIndex('href')
    if (hrefIndex >= 0) {
      const link = token.attrs[hrefIndex]
      // resolve link query params
      let href = link[1].trim()
      let query
      if (href.startsWith('(')) {
        const queryEndIndex = href.indexOf(')')
        link[1] = href.slice(queryEndIndex + 1)
        query = href.slice(1, queryEndIndex)
        href = link[1]
      }
      const queryOb = querystring.parse(query)
      const isExternal = /^https?:/.test(href)
      const isSourceLink = /(\/|\.md|\.html)(#.*)?$/.test(href)
      if (isExternal) {
        for (const attrKey in queryOb) {
          if (queryOb[attrKey]) {
            addAttr(token, attrKey, queryOb[attrKey])
          }
        }
        if (queryOb.target === undefined) {
          addAttr(token, 'target', '_blank')
        }
        if (!queryOb.rel === undefined) {
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

