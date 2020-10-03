import { resolvePageKey } from '@vuepress/core'

describe('core > page > resolvePageKey', () => {
  it('should begin with "v-"', () => {
    const key = resolvePageKey('foobar')

    expect(key.startsWith('v-')).toBe(true)
  })

  it('should return different page key with different identifier', () => {
    const keyFoo = resolvePageKey('foo')
    const keyBar = resolvePageKey('bar')

    expect(keyFoo).not.toEqual(keyBar)
  })
})
