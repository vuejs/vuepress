module.exports = (options = {}, context) => {
  const {
    normalSuffix = '',
    indexSuffix = '/'
  } = options

  return {
    extendPageData (page) {
      const { regularPath, frontmatter = {}} = page
      if (frontmatter.permalink) return
      page.path = regularPath
        .replace(/\.html$/, normalSuffix)
        .replace(/\/$/, indexSuffix)
    }
  }
}
