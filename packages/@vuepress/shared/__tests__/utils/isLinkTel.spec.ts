import { isLinkTel } from '@vuepress/shared'

const testCases: [string, boolean][] = [
  ['https://foobar.com', false],
  ['http://foobar.com', false],
  ['//foobar.com', false],
  ['foobar.com', false],
  ['/foo/bar', false],
  ['mailto:foobar', false],
  ['tel:foobar', true],
  ['../foo/bar', false],
]

describe('shared > isLinkMailto', () => {
  describe('should determine mailto link correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`link: ${source}`, () => {
        expect(isLinkTel(source)).toBe(expected)
      })
    })
  })
})
