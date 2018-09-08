const path = require('path')

function getIntervallers (max, interval) {
  const count = Math.floor(max / interval)
  const arr = [...Array(count + 1)]
  return arr.map((v, index) => {
    const start = index * interval
    const end = (index + 1) * interval - 1
    return [start, end > max ? max : end]
  })
}

function withBase (base, path) {
  if (path.charAt(0) === '/') {
    return base + path.slice(1)
  } else {
    return path
  }
}

module.exports = (options, ctx) => ({
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceApp.js')
  ],

  ready () {
    let { postsFilter, postsSorter } = options
    postsFilter = postsFilter || (({ type }) => type === 'post')
    postsSorter = postsSorter || ((prev, next) => {
      const prevTime = new Date(prev.frontmatter.date).getTime()
      const nextTime = new Date(next.frontmatter.date).getTime()
      return prevTime - nextTime > 0 ? -1 : 1
    })

    const { pages, base } = ctx
    const posts = pages.filter(postsFilter)
    const {
      perPagePosts = 10,
      paginationDir = 'page',
      firstPagePath = '/',
      layout = 'Layout'
    } = options

    const normalizedfirstPagePath = withBase(base, firstPagePath)
    const intervallers = getIntervallers(posts.length, perPagePosts)
    const pagination = {
      paginationPages: intervallers.map((interval, index) => {
        const path = index === 0
          ? normalizedfirstPagePath
          : `/${paginationDir}/${index + 1}/`
        return { path, interval }
      }),
      postsFilter: postsFilter.toString(),
      postsSorter: postsSorter.toString()
    }

    ctx.pagination = pagination
    pagination.paginationPages.forEach(({ path }) => {
      ctx.addPage({
        permalink: path,
        frontmatter: { layout }
      })
    })
  },

  async clientDynamicModules () {
    return {
      name: 'pagination.js',
      content: `export default ${JSON.stringify(ctx.pagination, null, 2)}`
    }
  }
})
