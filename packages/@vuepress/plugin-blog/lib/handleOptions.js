function handleOptions (options, ctx) {
  const { layoutComponentMap } = ctx
  const {
    directories = [],
    frontmatters = []
  } = options

  const isLayoutExists = name => layoutComponentMap[name] !== undefined
  const getLayout = (name, fallback) => {
    return isLayoutExists(name) ? name : (fallback || 'Layout')
  }

  const pageEnhancers = []
  const frontmatterClassificationPages = []
  const extraPages = []
  const paginations = []

  // 1. Directory-based classification
  for (const directory of directories) {
    const {
      id,
      dirname,
      path: listPath,
      layout: listLayout,
      frontmatter,
      itemLayout,
      itemPermalink,
      pagination = {
        perPagePosts: 10
      }
    } = directory

    if (!listPath) {
      continue
    }

    extraPages.push({
      permalink: listPath,
      frontmatter
    })

    pageEnhancers.push({
      when: ({ regularPath }) => regularPath === listPath,
      frontmatter: { layout: getLayout(listLayout) }
    })

    pageEnhancers.push({
      when: ({ regularPath }) => regularPath && regularPath !== listPath && regularPath.startsWith(`/${dirname}/`),
      frontmatter: {
        layout: getLayout(itemLayout),
        permalink: itemPermalink
      },
      data: { id: id, pid: id }
    })

    paginations.push({
      pid: id,
      id,
      options: pagination,
      getUrl (index) {
        if (index === 0) {
          return listPath
        }
        return `${listPath}page/${index + 1}/`
      }
    })
  }

  // 2. Frontmatter-based classification
  for (const frontmatterPage of frontmatters) {
    const {
      id,
      keys,
      path: listPath,
      layout: listLayout,
      frontmatter,
      itemLayout,
      pagination = {
        perPagePosts: 10
      }
    } = frontmatterPage

    if (!listPath) {
      continue
    }

    extraPages.push({
      permalink: listPath,
      frontmatter
    })

    frontmatterClassificationPages.push({
      id,
      pagination,
      keys
    })

    pageEnhancers.push({
      when: ({ regularPath }) => regularPath === listPath,
      frontmatter: { layout: getLayout(listLayout) }
    })

    pageEnhancers.push({
      when: ({ regularPath }) => regularPath && regularPath !== listPath && regularPath.startsWith(listPath),
      frontmatter: { layout: getLayout(itemLayout) }
    })
  }

  return {
    pageEnhancers,
    frontmatterClassificationPages,
    extraPages,
    paginations
  }
}

module.exports = {
  handleOptions
}
