export function pathToComponentName (path) {
  if (path.charAt(path.length - 1) === '/') {
    return `page${path.replace(/\//g, '-') + 'index'}`
  } else {
    return `page${path.replace(/\//g, '-').replace(/\.html$/, '')}`
  }
}

export function findPageForPath (pages, path) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (page.path === path) {
      return page
    }
  }
}

export function getTitle (title, page) {
  const selfTitle = page.frontmatter.home ? null : (
    page.frontmatter.title || // explicit title
    page.title // inferred title
  )
  const siteTitle = title
  return siteTitle
    ? selfTitle
      ? (siteTitle + ' | ' + selfTitle)
      : siteTitle
    : selfTitle || 'VuePress'
}
