export function injectMixins (options, mixins) {
  if (!options.mixins) {
    options.mixins = []
  }
  options.mixins.push(...mixins)
}

export function findPageForPath (pages, path) {
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]
    if (page.path === path) {
      return page
    }
  }
  return {
    path: '',
    frontmatter: {}
  }
}
