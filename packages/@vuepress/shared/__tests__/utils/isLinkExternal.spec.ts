import { isLinkExternal } from '@vuepress/shared'

const testCases: [
  Parameters<typeof isLinkExternal>,
  ReturnType<typeof isLinkExternal>
][] = [
  // with default base `/`
  [['https://foobar.com'], true],
  [['http://foobar.com'], true],
  [['//foobar.com'], true],
  [['foobar.com'], false],
  [['/foo/bar'], false],
  [['foo/bar'], false],
  [['../foo/bar'], false],

  // with base `/base/`
  [['/foo/bar', '/base/'], true],
  [['foo/bar', '/base/'], false],
  [['../foo/bar', '/base/'], false],
  [['/base/foo/bar', '/base/'], false],
  [['mailto:foobar', '/base/'], false],
  [['tel:foobar', '/base/'], false],
]

describe('shared > isLinkExternal', () => {
  describe('should determine external link correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`link: ${source[0]}, base: ${source[1] || '/'}`, () => {
        expect(isLinkExternal(...source)).toBe(expected)
      })
    })
  })
})
