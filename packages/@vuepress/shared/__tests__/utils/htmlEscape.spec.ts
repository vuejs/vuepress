import { htmlEscape } from '@vuepress/shared'

const testCases = [['&<>\'"', '&amp;&lt;&gt;&#39;&quot;']]

describe('shared > htmlEscape', () => {
  describe('should escape special chars', () => {
    testCases.forEach(([source, expected]) => {
      it(source, () => {
        expect(htmlEscape(source)).toBe(expected)
      })
    })
  })
})
