import { resolvePageTitle } from '@vuepress/core'

describe('core > page > resolvePageTitle', () => {
  it('should return title in frontmatter', () => {
    const resolved = resolvePageTitle({
      frontmatter: {
        title: 'title in frontmatter',
      },
      contentRaw: '',
    })

    expect(resolved).toBe('title in frontmatter')
  })

  it('should return h1 title in content', () => {
    const resolved = resolvePageTitle({
      frontmatter: {},
      contentRaw: '# title in content',
    })

    expect(resolved).toBe('title in content')
  })

  it('should return empty string', () => {
    const resolved = resolvePageTitle({ frontmatter: {}, contentRaw: '' })

    expect(resolved).toBe('')
  })
})
