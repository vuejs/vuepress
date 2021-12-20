import parseHeaders from '../src/parseHeaders'

describe('parseHeaders', () => {
  test('should unescape html', () => {
    const input = `&lt;div :id=&quot;&#39;app&#39;&quot;&gt;`
    expect(parseHeaders(input)).toBe(`<div :id="'app'">`)
  })

  test('should remove markdown tokens correctly', () => {
    const asserts: Record<string, string> = {
      // #238
      '[vue](vuejs.org)': 'vue',
      '`vue`': 'vue',
      '*vue*': 'vue',
      '**vue**': 'vue',
      '***vue***': 'vue',
      '_vue_': 'vue',
      '\\_vue\\_': '_vue_',
      '\\*vue\\*': '*vue*',
      '\\!vue\\!': '!vue!',

      // #2688
      '[vue](vuejs.org) / [vue](vuejs.org)': 'vue / vue',
      '[\\<ins>](vuejs.org)': '<ins>',

      // #564 For multiple markdown tokens
      '`a` and `b`': 'a and b',
      '***bold and italic***': 'bold and italic',
      '**bold** and *italic*': 'bold and italic'
    }
    Object.keys(asserts).forEach(input => {
      expect(parseHeaders(input)).toBe(asserts[input])
    })
  })
})
