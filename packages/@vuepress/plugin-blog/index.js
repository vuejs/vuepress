const { path, datatypes: { isString }} = require('@vuepress/shared-utils')

module.exports = (options, ctx) => {
  const { layoutComponentMap } = ctx
  const {
    pageEnhancers = [],
    categoryIndexPageUrl = '/category/',
    tagIndexPageUrl = '/tag/'
  } = options

  const isLayoutExists = name => layoutComponentMap[name] !== undefined
  const getLayout = (name, fallback) => isLayoutExists(name) ? name : fallback
  const isDirectChild = regularPath => path.parse(regularPath).dir === '/'

  const enhancers = [
    {
      when: ({ regularPath }) => isDirectChild(regularPath),
      frontmatter: { layout: getLayout('Page', 'Layout') },
      data: { type: 'page' }
    },
    {
      when: ({ regularPath }) => regularPath.startsWith('/category/'),
      frontmatter: { layout: getLayout('Category', 'Page') }
    },
    {
      when: ({ regularPath }) => regularPath === categoryIndexPageUrl,
      frontmatter: { layout: getLayout('Categories', 'Page') }
    },
    {
      when: ({ regularPath }) => regularPath.startsWith('/tag/'),
      frontmatter: { layout: getLayout('Tag', 'Page') }
    },
    {
      when: ({ regularPath }) => regularPath === tagIndexPageUrl,
      frontmatter: { layout: getLayout('Tags', 'Page') }
    },
    {
      when: ({ regularPath }) => regularPath === '/',
      frontmatter: { layout: getLayout('Layout') }
    },
    {
      when: ({ regularPath }) => regularPath.startsWith('/_posts/'),
      frontmatter: {
        layout: getLayout('Post', 'Page'),
        permalink: '/:year/:month/:day/:slug'
      },
      data: { type: 'post' }
    },
    ...pageEnhancers
  ]

  return {
    /**
     * Modify page's metadata according to the habits of blog users.
     */
    extendPageData (pageCtx) {
      const { frontmatter: rawFrontmatter } = pageCtx

      enhancers.forEach(({
        when,
        data = {},
        frontmatter = {}
      }) => {
        if (when(pageCtx)) {
          Object.assign(rawFrontmatter, frontmatter)
          Object.assign(pageCtx, data)
        }
      })
    },

    /**
     * Create tag page and category page.
     */
    ready () {
      const { pages } = ctx
      const tagMap = {}
      const categoryMap = {}

      const curryHandler = (scope, map) => (key, pageKey) => {
        if (key) {
          if (!map[key]) {
            map[key] = {}
            map[key].path = `/${scope}/${key}.html`
            map[key].pageKeys = []
          }
          map[key].pageKeys.push(pageKey)
        }
      }

      const handleTag = curryHandler('tag', tagMap)
      const handleCategory = curryHandler('category', categoryMap)

      pages.forEach(({
        key,
        frontmatter: {
          tag,
          tags,
          category,
          categories
        }
      }) => {
        if (isString(tag)) {
          handleTag(tag, key)
        }
        if (Array.isArray(tags)) {
          tags.forEach(tag => handleTag(tag, key))
        }
        if (isString(category)) {
          handleCategory(category, key)
        }
        if (Array.isArray(categories)) {
          categories.forEach(category => handleCategory(category, key))
        }
      })

      ctx.tagMap = tagMap
      ctx.categoryMap = categoryMap

      const extraPages = [
        {
          permalink: tagIndexPageUrl,
          frontmatter: { title: `Tags` }
        },
        {
          permalink: categoryIndexPageUrl,
          frontmatter: { title: `Categories` }
        },
        ...Object.keys(tagMap).map(tagName => ({
          permalink: tagMap[tagName].path,
          meta: { tagName },
          frontmatter: { title: `${tagName} | Tag` }
        })),
        ...Object.keys(categoryMap).map(categoryName => ({
          permalink: categoryMap[categoryName].path,
          meta: { categoryName },
          frontmatter: { title: `${categoryName} | Category` }
        }))
      ]
      extraPages.forEach(page => ctx.addPage(page))
    },

    /**
     * Generate tag and category metadata.
     */
    async clientDynamicModules () {
      return [
        {
          name: 'tag.js',
          content: `export default ${JSON.stringify(ctx.tagMap, null, 2)}`
        },
        {
          name: 'category.js',
          content: `export default ${JSON.stringify(ctx.categoryMap, null, 2)}`
        }
      ]
    },

    enhanceAppFiles: [
      path.resolve(__dirname, 'clientPlugin.js')
    ]
  }
}
