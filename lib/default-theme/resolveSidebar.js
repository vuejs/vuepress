export default function resolveSidebar (route, site) {
  const { pages, themeConfig } = site
  const sidebarConfig = themeConfig.sidebar
  if (!sidebarConfig) {
    return pages
  } else {
    const matchingConfig = Array.isArray(sidebarConfig)
      ? sidebarConfig
      : resolveMatchingSidebar(route, sidebarConfig)
    return matchingConfig.map(item => resolveItem(item, site.pages))
  }
}

function resolveMatchingSidebar (route, sidebarConfig) {
  for (const base in sidebarConfig) {
    if (ensureEndingSlash(route.path).indexOf(base) === 0) {
      return sidebarConfig[base]
    }
  }
}

function ensureEndingSlash (path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveItem (item, pages) {
  if (typeof item === 'string') {
    return Object.assign({ type: 'page' }, findPage(pages, item))
  } else if (Array.isArray(item)) {
    return {
      type: 'heading',
      title: item[0],
      children: (item[1] || []).map(child => resolveItem(child, pages))
    }
  } else {
    throw new Error(`Invalid sidebar item config: ${item}`)
  }
}

function findPage (pages, path) {
  path = normalize(path)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].path) === path) {
      return pages[i]
    }
  }
}

function normalize (path) {
  return path.replace(/\.(md|html)$/, '')
}
