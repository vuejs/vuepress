const hashRE = /#.*$/
const extRE = /\.(md|html)$/
const slashRE = /\/$/
const outboundRE = /^https?:/

export function normalize (path) {
  return path
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function getHash (path) {
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

export function ensureExt (path) {
  if (slashRE.test(path) || outboundRE.test(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  return normalize(path) + '.html' + hash
}

export function resolvePage (pages, rawPath) {
  const path = normalize(rawPath)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].path) === path) {
      return Object.assign({}, pages[i], {
        type: 'page',
        path: ensureExt(rawPath)
      })
    }
  }
  console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`)
  return {}
}
