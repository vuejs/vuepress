import { resolvePageTitle } from '@vuepress/core'

describe('core > page > resolvePageTitle', () => {
  it('should return title in frontmatter', () => {
    const resolved = resolvePageTitle({
      frontmatter: {
        title: 'title in frontmatter',
      },
      headers: [],
    })

    expect(resolved).toBe('title in frontmatter')
  })

  it('should return h1 title in content', () => {
    const resolved = resolvePageTitle({
      frontmatter: {},
      headers: [
        {
          level: 1,
          title: 'title in header',
          slug: '',
          children: [],
        },
      ],
    })

    expect(resolved).toBe('title in header')
  })

  it('should return empty string', () => {
    const resolved = resolvePageTitle({ frontmatter: {}, headers: [] })

    expect(resolved).toBe('')
  })
})
