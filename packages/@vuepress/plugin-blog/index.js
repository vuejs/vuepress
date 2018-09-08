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
    const getLayout = name => isLayoutExists(name) ? name : 'Layout'

    const isDirectChild = regularPath => path.parse(regularPath).dir === '/'
    const enhancers = [
      {
        when: ({ regularPath }) => isDirectChild(regularPath),
        frontmatter: { layout: getLayout('Page') }
      },
      {
        when: ({ regularPath }) => regularPath === '/category.html',
        frontmatter: { layout: getLayout('Category') }
      },
      {
        when: ({ regularPath }) => regularPath === '/tags.html',
        frontmatter: { layout: getLayout('Tag') }
      },
      {
        when: ({ regularPath }) => regularPath === '/',
        frontmatter: { layout: getLayout('Layout') }
      },
      {
        when: ({ regularPath }) => regularPath.startsWith('/_posts/'),
        frontmatter: {
          layout: getLayout('Post'),
          permalink: '/:year/:month/:day/:slug'
        }
      },
      ...pageEnhancers
    ]

    enhancers.forEach(({
      when,
      frontmatter = {}
    }) => {
      if (when(pageCtx)) {
        Object.assign(rawFrontmatter, frontmatter)
      }
    })
  }
})
