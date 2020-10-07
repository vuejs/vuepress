import { createApp, resolvePageExcerpt } from '@vuepress/core'
import { path } from '@vuepress/utils'

const dirSource = path.resolve(__dirname, 'fake-source')
const app = createApp({
  dirSource,
})

describe('core > page > resolvePageExcerpt', () => {
  it('should resolve page excerpt correctly', () => {
    const resolved = resolvePageExcerpt('foobar', app, null)

    expect(resolved).toBe('<p>foobar</p>\n')
  })
})
