import { resolvePageKey } from '@vuepress/core'

describe('core > page > resolvePageKey', () => {
  it('should begin with "v-"', () => {
    const key = resolvePageKey({ path: 'foobar' })

    expect(key.startsWith('v-')).toBe(true)
  })

  it('should return different page key with different identifier', () => {
    const keyFoo = resolvePageKey({ path: 'foo' })
    const keyBar = resolvePageKey({ path: 'bar' })

    expect(keyFoo).not.toEqual(keyBar)
  })
})
