import { resolvePagePermalink } from '@vuepress/core'

describe('core > page > resolvePagePermalink', () => {
  it('should return null', () => {
    const resolved = resolvePagePermalink({}, {}, '', '', null, '')

    expect(resolved).toBe(null)
  })

  describe('use permalink or pattern', () => {
    it('should use permalink in frontmatter', () => {
      const resolved = resolvePagePermalink(
        {},
        {
          permalink: '/frontmatter',
        },
        '',
        '',
        null,
        ''
      )

      expect(resolved).toBe('/frontmatter')
    })

    it('should use permalink in options', () => {
      const resolved = resolvePagePermalink(
        {
          permalink: '/options',
        },
        {},
        '',
        '',
        null,
        ''
      )

      expect(resolved).toBe('/options')
    })

    it('should use permalinkPattern in frontmatter', () => {
      const resolved = resolvePagePermalink(
        {},
        {
          permalinkPattern: '/:year/:month/:day/:slug/frontmatter',
        },
        'foo-bar',
        '2020-10-07',
        null,
        ''
      )

      expect(resolved).toBe('/2020/10/07/foo-bar/frontmatter')
    })

    it('should use permalinkPattern in options', () => {
      const resolved = resolvePagePermalink(
        {
          permalinkPattern: '/:year/:month/:day/:slug/options',
        },
        {},
        'foo-bar',
        '2020-10-07',
        null,
        ''
      )

      expect(resolved).toBe('/2020/10/07/foo-bar/options')
    })
  })

  describe('permalink pattern', () => {
    it('should replace :raw with empty string 1', () => {
      const resolved = resolvePagePermalink(
        {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        {},
        'foo-bar',
        '2020-10-07',
        null,
        ''
      )

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should replace :raw with empty string 2', () => {
      const resolved = resolvePagePermalink(
        {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        {},
        'foo-bar',
        '2020-10-07',
        '',
        ''
      )

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should replace :raw with empty string 3', () => {
      const resolved = resolvePagePermalink(
        {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        {},
        'foo-bar',
        '2020-10-07',
        '/',
        ''
      )

      expect(resolved).toBe('/2020/10/07/foo-bar/')
    })

    it('should prefix with locale path', () => {
      const resolved = resolvePagePermalink(
        {
          permalinkPattern: '/:year/:month/:day/:slug/:raw',
        },
        {},
        'foo-bar',
        '2020-10-07',
        '/raw.html',
        '/en/'
      )

      expect(resolved).toBe('/en/2020/10/07/foo-bar/raw.html')
    })
  })
})
