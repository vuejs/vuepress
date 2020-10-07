import { resolvePageSlug } from '@vuepress/core'

describe('core > page > resolvePageSlug', () => {
  it('should return empty string', () => {
    const resolved = resolvePageSlug(null)

    expect(resolved).toBe('')
  })

  it('should remove extension', () => {
    const resolved = resolvePageSlug('foo-bar.html')

    expect(resolved).toBe('foo-bar')
  })

  it('should remove date prefix', () => {
    const resolved = resolvePageSlug('2020-10-07-foo-bar.html')

    expect(resolved).toBe('foo-bar')
  })
})
