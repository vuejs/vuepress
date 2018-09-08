const path = require('path')

module.exports = (options, ctx) => ({
  extendPageData (pageCtx) {
    const {
      _frontmatterMeta     // result of parseFrontmatter
      // type: { data: FrontMatterObject, content: rest content }

      // _filePath,        // file's absolute path
      // _content,         // file's raw content string
      // key,              // file's hash key
      // regularPath       // current page's default link (follow the file hierarchy)
    } = pageCtx

    const { data: rawFrontmatter } = _frontmatterMeta
    const { layoutComponentMap } = ctx
    const { pageEnhancers = [] } = options
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
        when: ({ regularPath }) => regularPath === '/category.html',
        frontmatter: { layout: getLayout('Category', 'Page') }
      },
      {
        when: ({ regularPath }) => regularPath === '/tags.html',
        frontmatter: { layout: getLayout('Tag', 'Page') }
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
  }
})
