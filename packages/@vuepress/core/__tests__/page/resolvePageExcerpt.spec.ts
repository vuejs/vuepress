import { createApp, resolvePageExcerpt } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/no-layouts.js'),
})

describe('core > page > resolvePageExcerpt', () => {
  it('should resolve page excerpt correctly', () => {
    const resolved = resolvePageExcerpt({
      app,
      excerptRaw: 'foobar',
      frontmatter: {},
      filePath: null,
      filePathRelative: null,
    })

    expect(resolved).toBe('<p>foobar</p>\n')
  })
})
