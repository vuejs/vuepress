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

    const enhancers = [
      {
        when: ({ regularPath }) => regularPath === '/category/',
        frontmatter: { layout: getLayout('Category') }
      },
      {
        when: ({ regularPath }) => regularPath === '/tags/',
        frontmatter: { layout: getLayout('Tag') }
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
