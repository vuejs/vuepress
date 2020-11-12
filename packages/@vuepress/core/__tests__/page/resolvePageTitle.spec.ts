import { resolvePageTitle } from '@vuepress/core'

describe('core > page > resolvePageTitle', () => {
  it('should return title in frontmatter', () => {
    const resolved = resolvePageTitle({
      content: '# title in content',
      frontmatter: {
        title: 'title in frontmatter',
      },
      headers: [
        {
          level: 1,
          title: 'title in header',
          slug: '',
          children: [],
        },
      ],
    })

    expect(resolved).toBe('title in frontmatter')
  })

  it('should return title of the first h1 header', () => {
    const resolved = resolvePageTitle({
      content: '# title in content',
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

  it('should return the first `# title` in content', () => {
    const resolved = resolvePageTitle({
      content: '# title in content',
      frontmatter: {},
      headers: [
        {
          level: 2,
          title: 'title in header',
          slug: '',
          children: [],
        },
      ],
    })

    expect(resolved).toBe('title in content')
  })

  it('should return empty string', () => {
    const resolved = resolvePageTitle({
      content: '',
      frontmatter: {},
      headers: [],
    })

    expect(resolved).toBe('')
  })
})
