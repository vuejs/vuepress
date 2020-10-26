import { htmlUnescape } from '@vuepress/shared'

const testCases = [
  ['&amp;&#38;&lt;&#60;&gt;&#62;&apos;&#39;&quot;&#34;', '&&<<>>\'\'""'],
  ['&amp;lt;', '&lt;'],
  [
    '&amp;lt;script&amp;gt;&amp;lt;/script&amp;gt;',
    '&lt;script&gt;&lt;/script&gt;',
  ],
]

describe('shared > htmlUnescape', () => {
  describe('should unescape special chars', () => {
    testCases.forEach(([source, expected]) => {
      it(source, () => {
        expect(htmlUnescape(source)).toBe(expected)
      })
    })
  })
})
