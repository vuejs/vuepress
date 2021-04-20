import { createApp, resolvePageExcerpt } from '@vuepress/core'
import { path } from '@vuepress/utils'

const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
})

describe('core > page > resolvePageExcerpt', () => {
  it('should resolve page excerpt correctly', () => {
    const resolved = resolvePageExcerpt({
      app,
      excerptRaw: 'foobar',
      frontmatter: {},
      filePathRelative: null,
    })

    expect(resolved).toBe('<p>foobar</p>\n')
  })
})
