import matchQuery from '../match-query'

describe('matchQuery', () => {
  const page = {
    title: 'HoMe PaGe',
    frontmatter: {
      tags: ['vuepress', 'is', 'jUst    AwEsOme']
    }
  }

  test('should match when query includes part of the page title', () => {
    const query = 'hom'

    const match = matchQuery(query, page)

    expect(match).toBe(true)
  })

  test('should match when query includes the full page title', () => {
    const query = 'home     page'

    const match = matchQuery(query, page)

    expect(match).toBe(true)
  })

  test('should match when query includes a tag', () => {
    const query = 'vuepress'

    const match = matchQuery(query, page)

    expect(match).toBe(true)
  })

  test('should match when query includes part of tag', () => {
    const query = 'just aw'

    const match = matchQuery(query, page)

    expect(match).toBe(true)
  })
})
