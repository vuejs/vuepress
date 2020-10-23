import { resolvePageFrontmatter } from '@vuepress/core'

describe('core > page > resolvePageFrontmatter', () => {
  it('should merge raw frontmatter and options frontmatter', () => {
    const resolved = resolvePageFrontmatter({
      frontmatterRaw: {
        title: 'title in raw frontmatter',
      },
      options: {
        frontmatter: {
          description: 'description in options frontmatter',
        },
      },
    })

    expect(resolved).toEqual({
      title: 'title in raw frontmatter',
      description: 'description in options frontmatter',
    })
  })

  it('should use fields from raw frontmatter first', () => {
    const resolved = resolvePageFrontmatter({
      frontmatterRaw: {
        title: 'title in raw frontmatter',
      },
      options: {
        frontmatter: {
          title: 'title in options frontmatter',
        },
      },
    })

    expect(resolved).toEqual({
      title: 'title in raw frontmatter',
    })
  })
})
