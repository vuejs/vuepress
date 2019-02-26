const { path } = require('@vuepress/shared-utils')

function getIntervallers (max, interval) {
  const count = max % interval === 0 ? Math.floor(max / interval) : Math.floor(max / interval) + 1
  const arr = [...Array(count)]
  return arr.map((v, index) => {
    const start = index * interval
    const end = (index + 1) * interval
    return [start, end > max ? max : end]
  })
}

module.exports = (options, ctx) => ({
  enhanceAppFiles: [
    path.resolve(__dirname, 'enhanceAppFile.js')
  ],

  ready () {
    const { postsFilter, postsSorter } = options
    ctx.postsFilter = postsFilter || (({ type }) => type === 'post')
    ctx.postsSorter = postsSorter || ((prev, next) => {
      const prevTime = new Date(prev.frontmatter.date).getTime()
      const nextTime = new Date(next.frontmatter.date).getTime()
      return prevTime - nextTime > 0 ? -1 : 1
    })

    const { pages } = ctx
    const posts = pages.filter(ctx.postsFilter)
    const {
      perPagePosts = 10,
      paginationDir = 'page',
      firstPagePath = '/',
      layout = 'Layout'
    } = options

    const intervallers = getIntervallers(posts.length, perPagePosts)
    ctx.paginationPages = intervallers.map((interval, index) => {
      const path = index === 0
        ? firstPagePath
        : `/${paginationDir}/${index + 1}/`
      return { path, interval }
    })

    ctx.paginationPages.forEach(({ path }, index) => {
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
      content: `\
export const paginationPages = ${JSON.stringify(ctx.paginationPages, null, 2)}
export const postsFilter = ${stringifyFunction(ctx.postsFilter)}
export const postsSorter = ${stringifyFunction(ctx.postsSorter)}`
    }
  }
})

function stringifyFunction (input) {
  let output = String(input)
  if (!/^(function\b|\()/.test(output)) {
    /**
     * fix edge case:
     * ```js
     * const foo = { bar () {} }
     * stringifyFunction(foo.bar)
     * ```
     */
    output = output.replace(/^[^(]+/, 'function')
  }
  return output
}
