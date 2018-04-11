import { siteData } from './.temp/siteData'

export function pathToComponentName (path) {
  if (path.charAt(path.length - 1) === '/') {
    return `page${path.replace(/\//g, '-') + 'index'}`
  } else {
    return `page${path.replace(/\//g, '-').replace(/\.html$/, '')}`
  }
}

export function findPageForPath (path) {
  const pages = siteData.pages
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (page.path === path) {
      return page
    }
  }
}

export function getTitle (page) {
  const selfTitle = page.frontmatter.home ? null : (
    page.frontmatter.title || // explicit title
    page.title // inferred title
  )
  const siteTitle = siteData.title
  return siteTitle
    ? selfTitle
      ? (siteTitle + ' | ' + selfTitle)
      : siteTitle
    : selfTitle || 'VuePress'
}

export function getLang (page) {
  return page.frontmatter.lang || 'en'
}
