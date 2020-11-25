import { isLinkHttp } from '@vuepress/shared'

const testCases: [string, ReturnType<typeof isLinkHttp>][] = [
  ['https://foobar.com', true],
  ['http://foobar.com', true],
  ['//foobar.com', true],
  ['foobar.com', false],
  ['/foo/bar', false],
]

describe('shared > isLinkHttp', () => {
  describe('should determine http link correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`link: ${source}`, () => {
        expect(isLinkHttp(source)).toBe(expected)
      })
    })
  })
})
