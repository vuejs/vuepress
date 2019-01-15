const { path } = require('@vuepress/shared-utils')
const { curryFrontmatterHandler } = require('./lib/util')
const { handleOptions } = require('./lib/handleOptions')
const { registerPagination } = require('./lib/pagination')

module.exports = (options, ctx) => {
  const {
    pageEnhancers,
    frontmatterClassificationPages,
    extraPages,
    paginations
  } = handleOptions(options, ctx)

  return {
    /**
     * Modify page's metadata.
     */
    extendPageData (pageCtx) {
      const { frontmatter: rawFrontmatter } = pageCtx
      pageEnhancers.forEach(({
        when,
        data = {},
        frontmatter = {}
      }) => {
        if (when(pageCtx)) {
          Object.keys(frontmatter).forEach(key => {
            // Respect the original frontmatter in markdown
            if (!rawFrontmatter[key]) {
              rawFrontmatter[key] = frontmatter[key]
            }
          })
          Object.assign(pageCtx, data)
        }
      })
    },

    /**
     * Create tag page and category page.
     */
    async ready () {
      const { pages } = ctx

      // 1. Tweak data structure to store the classified info.
      const frontmatterClassifiedPages = frontmatterClassificationPages.map(({
        id,
        keys,
        pagination
      }) => {
        const map = {}
        return {
          id,
          keys,
          pagination,
          map,
          _handler: curryFrontmatterHandler(id, map)
        }
      })

      // 2. Handle frontmatter per page.
      for (const { key: pageKey, frontmatter } of pages) {
        if (!frontmatter || Object.keys(frontmatter).length === 0) {
          continue
        }
        for (const { keys, _handler } of frontmatterClassifiedPages) {
          for (const key of keys) {
            const fieldValue = frontmatter[key]
            Array.isArray(fieldValue)
              ? fieldValue.forEach(v => _handler(v, pageKey))
              : _handler(fieldValue, pageKey)
          }
        }
      }

      ctx.frontmatterClassifiedPages = frontmatterClassifiedPages

      // 3. Staticize all pages.
      const allExtraPages = [
        ...extraPages,
        ...frontmatterClassifiedPages
          .map(frontmatterClassifiedPage => {
            const { map, pagination, keys } = frontmatterClassifiedPage
            return Object.keys(map).map((key) => {
              const { path, scope } = map[key]

              // Register pagination
              paginations.push({
                pid: scope,
                id: key,
                options: {
                  ...pagination,
                  layout: 'FrontmatterClassification',
                  serverPageFilter (page) {
                    return clientFrontmatterClassificationPageFilter(page, keys, key)
                  },
                  clientPageFilter: clientFrontmatterClassificationPageFilter
                },
                getUrl (index) {
                  if (index === 0) {
                    return `/${scope}/${key}/`
                  }
                  return `/${scope}/${key}/page/${index + 1}/`
                },
                getTitle (index) {
                  return `Page ${index + 1} - ${key} | ${scope}`
                }
              })

              return {
                permalink: path,
                meta: {
                  frontmatterClassificationKey: scope
                },
                pid: scope,
                id: key,
                frontmatter: {
                  layout: 'FrontmatterClassification',
                  title: `${key} | ${scope}`
                }
              }
            })
          })
          .reduce((arr, next) => arr.concat(next), [])
      ]

      await Promise.all(allExtraPages.map(async page => ctx.addPage(page)))
      await registerPagination(paginations, ctx)
    },

    /**
     * Generate tag and category metadata.
     */
    async clientDynamicModules () {
      const frontmatterClassifiedPageMap = ctx.frontmatterClassifiedPages
        .reduce((map, page) => {
          map[page.id] = page.map
          return map
        }, {})

      const PREFIX = 'vuepress_blog'
      return [
        {
          name: `${PREFIX}/frontmatterClassifications.js`,
          content: `export default ${JSON.stringify(frontmatterClassificationPages, null, 2)}`
        },
        {
          name: `${PREFIX}/frontmatterClassified.js`,
          content: `export default ${JSON.stringify(frontmatterClassifiedPageMap, null, 2)}`
        },
        {
          name: `${PREFIX}/paginations.js`,
          content: `export default ${JSON.stringify(ctx.paginations, null, 2)}`
        },
        {
          name: `${PREFIX}/pageFilters.js`,
          content: `export default ${mapToString(ctx.pageFilters)}`
        },
        {
          name: `${PREFIX}/pageSorters.js`,
          content: `export default ${mapToString(ctx.pageSorters)}`
        }
      ]
    },

    enhanceAppFiles: [
      path.resolve(__dirname, 'client/classification.js'),
      path.resolve(__dirname, 'client/pagination.js')
    ]
  }
}

function mapToString (map) {
  let str = `{\n`
  for (const key of Object.keys(map)) {
    str += `  "${key}": ${map[key]},\n`
  }
  str += '}'
  return str
}

function clientFrontmatterClassificationPageFilter (page, keys, value) {
  return keys.some(key => {
    const _value = page.frontmatter[key]
    if (Array.isArray(_value)) {
      return _value.some(i => i === value)
    }
    return _value === value
  })
}
