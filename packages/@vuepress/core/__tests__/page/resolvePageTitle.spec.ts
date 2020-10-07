import { resolvePageTitle } from '@vuepress/core'

describe('core > page > resolvePageTitle', () => {
  it('should return title in frontmatter', () => {
    const resolved = resolvePageTitle(
      {
        title: 'title in frontmatter',
      },
      ''
    )

    expect(resolved).toBe('title in frontmatter')
  })

  it('should return h1 title in content', () => {
    const resolved = resolvePageTitle({}, '# title in content')

    expect(resolved).toBe('title in content')
  })

  it('should return empty string', () => {
    const resolved = resolvePageTitle({}, '')

    expect(resolved).toBe('')
  })
})
