import { removeLeadingSlash } from '@vuepress/shared'

const testCases = [
  ['foo/bar', 'foo/bar'],
  ['foo/bar/', 'foo/bar/'],
  ['/foo/bar', 'foo/bar'],
  ['/foo/bar/', 'foo/bar/'],
  ['foo/bar.html', 'foo/bar.html'],
  ['/foo/bar.html', 'foo/bar.html'],
]

describe('shared > removeLeadingSlash', () => {
  describe('should remove ending slash', () => {
    testCases.forEach(([source, expected]) => {
      it(source, () => {
        expect(removeLeadingSlash(source)).toBe(expected)
      })
    })
  })
})
