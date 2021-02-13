import { resolvePagePermalink } from '@vuepress/core'

describe('core > page > resolvePagePermalink', () => {
  it('should return null', () => {
    const resolved = resolvePagePermalink({
      frontmatter: {},
      slug: '',
      date: '',
      pathInferred: null,
      pathLocale: '',
    })

    expect(resolved).toBe(null)
  })

  describe('use permalink or pattern', () => {
    it('should use permalink in frontmatter', () => {
      const resolved = resolvePagePermalink({
        frontmatter: {
          permalink: '/frontmatter',
        },
        slug: '',
        date: '',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/frontmatter')
    })

    it('should use permalinkPattern in frontmatter', () => {
      const resolved = resolvePagePermalink({
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/frontmatter',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/frontmatter')
    })
  })

  describe('permalink pattern', () => {
    it('should replace :raw with empty string 1', () => {
      const resolved = resolvePagePermalink({
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: null,
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should replace :raw with empty string 2', () => {
      const resolved = resolvePagePermalink({
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: '',
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should replace :raw with empty string 3', () => {
      const resolved = resolvePagePermalink({
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: '/',
        pathLocale: '',
      })

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should prefix with locale path', () => {
      const resolved = resolvePagePermalink({
        frontmatter: {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        slug: 'foo-bar',
        date: '2020-10-07',
        pathInferred: '/raw.html',
        pathLocale: '/en/',
      })

      expect(resolved).toBe('/en/2020/10/07/foo-bar/raw.html')
    })
  })
})
