const { path } = require('@vuepress/shared-utils')

function getIntervallers (max, interval) {
  const count = max % interval === 0 ? Math.floor(max / interval) : Math.floor(max / interval) + 1
  const arr = [...Array(count)]
  return arr.map((v, index) => {
    const start = index * interval
    const end = (index + 1) * interval - 1
    return [start, end > max ? max : end]
  })
}

module.exports = (options, ctx) => ({
  enhanceAppFiles: [
    path.resolve(__dirname, 'clientPlugin.js')
  ],

  ready () {
    let { postsFilter, postsSorter } = options
    postsFilter = postsFilter || (({ type }) => type === 'post')
    postsSorter = postsSorter || ((prev, next) => {
      const prevTime = new Date(prev.frontmatter.date).getTime()
      const nextTime = new Date(next.frontmatter.date).getTime()
      return prevTime - nextTime > 0 ? -1 : 1
    })

    const { pages } = ctx
    const posts = pages.filter(postsFilter)
    const {
      perPagePosts = 10,
      paginationDir = 'page',
      firstPagePath = '/',
      layout = 'Layout'
    } = options

    const intervallers = getIntervallers(posts.length, perPagePosts)
    const pagination = {
      paginationPages: intervallers.map((interval, index) => {
        const path = index === 0
          ? firstPagePath
          : `/${paginationDir}/${index + 1}/`
        return { path, interval }
      }),
      postsFilter: postsFilter.toString(),
      postsSorter: postsSorter.toString()
    }

    ctx.pagination = pagination
    pagination.paginationPages.forEach(({ path }, index) => {
      if (path === '/') {
        return
      }
      ctx.addPage({
        permalink: path,
        frontmatter: {
          layout,
          title: `Page ${index + 1}`
        }
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
