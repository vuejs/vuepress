module.exports = (options = {}, context) => {
  const {
    normalSuffix = '',
    indexSuffix = '/'
  } = options

  return {
    extendPageData (page) {
      const { regularPath, frontmatter = {}} = page
      if (frontmatter.permalink) return
      if (regularPath.endsWith('.html')) {
        // normal path
        // e.g. foo/bar.md -> foo/bar.html
        page.path = regularPath.slice(0, -5) + normalSuffix
      } else if (regularPath.endsWith('/')) {
        // index path
        // e.g. foo/index.md -> foo/
        page.path = regularPath.slice(0, -1) + indexSuffix
      }
    }
  }
}
