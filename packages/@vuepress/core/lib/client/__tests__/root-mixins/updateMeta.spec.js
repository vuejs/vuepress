import updateMeta from '../../root-mixins/updateMeta'

describe('getMergedMetaTags', () => {
  function metaFaker (pageMeta = null, siteMeta = []) {
    return {
      $page: {
        frontmatter: { meta: pageMeta }
      },
      $description: '$description',
      siteMeta: siteMeta
    }
  }

  test('empty', () => {
    const me = metaFaker()
    const actual = updateMeta.methods.getMergedMetaTags.call(me)
    expect(actual).toEqual([
      { name: 'description', content: '$description' }
    ])
  })

  test('description in pageMeta, $description and siteMeta should use pageMeta', () => {
    const me = metaFaker([
      { name: 'description', content: 'pageMeta' }
    ], [
      { name: 'description', content: 'siteMeta' }
    ])
    const actual = updateMeta.methods.getMergedMetaTags.call(me)
    expect(actual).toEqual([
      { name: 'description', content: 'pageMeta' }
    ])
  })

  test('description in $description and siteMeta should use $description', () => {
    const me = metaFaker(null, [
      { name: 'description', content: 'siteMeta' }
    ])
    const actual = updateMeta.methods.getMergedMetaTags.call(me)
    expect(actual).toEqual([
      { name: 'description', content: '$description' }
    ])
  })

  test('allow multiple article:tag', () => {
    const me = metaFaker([
      { property: 'article:tag', content: 'tag1' },
      { property: 'article:tag', content: 'tag2' },
      { property: 'article:tag', content: 'tag3' }
    ], [])
    const actual = updateMeta.methods.getMergedMetaTags.call(me)
    expect(actual).toEqual([
      { property: 'article:tag', content: 'tag1' },
      { property: 'article:tag', content: 'tag2' },
      { property: 'article:tag', content: 'tag3' },
      { name: 'description', content: '$description' }
    ])
  })

  test('pageMeta order should not be changed', () => {
    const me = metaFaker([
      { property: 'og:image', content: 'https://example.com/rock.jpg' },
      { property: 'og:image:width', content: '300' },
      { property: 'og:image:height', content: '300' },
      { property: 'og:image', content: 'https://example.com/rock2.jpg' },
      { property: 'og:image', content: 'https://example.com/rock3.jpg' },
      { property: 'og:image:height', content: '1000' }
    ], [])
    const actual = updateMeta.methods.getMergedMetaTags.call(me)
    expect(actual).toEqual([
      { property: 'og:image', content: 'https://example.com/rock.jpg' },
      { property: 'og:image:width', content: '300' },
      { property: 'og:image:height', content: '300' },
      { property: 'og:image', content: 'https://example.com/rock2.jpg' },
      { property: 'og:image', content: 'https://example.com/rock3.jpg' },
      { property: 'og:image:height', content: '1000' },
      { name: 'description', content: '$description' }
    ])
  })

  test('siteMeta with same meta identifier of pageMeta should be ignore', () => {
    const me = metaFaker([
      { property: 'og:image', content: 'https://example.com/rock2.jpg' },
      { property: 'og:image:width', content: '300' },
      { property: 'og:image:height', content: '300' }
    ], [
      { property: 'og:image', content: 'https://example.com/rock1.jpg' },
      { property: 'og:image:width', content: '100' },
      { property: 'og:image:height', content: '100' },
      { property: 'og:site_name', content: 'siteMeta' }
    ])
    const actual = updateMeta.methods.getMergedMetaTags.call(me)
    expect(actual).toEqual([
      { property: 'og:image', content: 'https://example.com/rock2.jpg' },
      { property: 'og:image:width', content: '300' },
      { property: 'og:image:height', content: '300' },
      { name: 'description', content: '$description' },
      { property: 'og:site_name', content: 'siteMeta' }
    ])
  })
})
