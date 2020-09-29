import { removeEndingSlash } from '@vuepress/shared'

const testCases = [
  ['foo/bar', 'foo/bar'],
  ['foo/bar/', 'foo/bar'],
  ['/foo/bar', '/foo/bar'],
  ['/foo/bar/', '/foo/bar'],
  ['foo/bar.html', 'foo/bar.html'],
  ['/foo/bar.html', '/foo/bar.html'],
]

describe('shared > removeEndingSlash', () => {
  describe('should remove ending slash', () => {
    testCases.forEach(([source, expected]) => {
      it(source, () => {
        expect(removeEndingSlash(source)).toBe(expected)
      })
    })
  })
})
