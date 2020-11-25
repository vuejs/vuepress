import { isLinkAbsolute } from '@vuepress/shared'

const testCases: [string, ReturnType<typeof isLinkAbsolute>][] = [
  ['https://foobar.com', true],
  ['http://foobar.com', true],
  ['//foobar.com', true],
  ['https://foobar.com/foo/bar', true],
  ['foobar.com', false],
  ['/foo/bar', true],
  ['foo/bar', false],
]

describe('shared > isLinkAbsolute', () => {
  describe('should determine absolute link correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`link: ${source}`, () => {
        expect(isLinkAbsolute(source)).toBe(expected)
      })
    })
  })
})
