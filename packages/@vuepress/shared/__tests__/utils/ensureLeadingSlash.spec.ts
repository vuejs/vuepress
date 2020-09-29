import { ensureLeadingSlash } from '@vuepress/shared'

const testCases = [
  ['foo/bar', '/foo/bar'],
  ['foo/bar/', '/foo/bar/'],
  ['/foo/bar', '/foo/bar'],
  ['/foo/bar/', '/foo/bar/'],
  ['foo/bar.html', '/foo/bar.html'],
  ['/foo/bar.html', '/foo/bar.html'],
]

describe('shared > ensureLeadingSlash', () => {
  describe('should ensure leading slash for urls', () => {
    testCases.forEach(([source, expected]) => {
      it(source, () => {
        expect(ensureLeadingSlash(source)).toBe(expected)
      })
    })
  })
})
