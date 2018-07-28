import {
  parseHeaders,
  removeTailHtml,
  deeplyParseHeaders
} from '@/util/parseHeaders'

describe('parseHeaders', () => {
  test('should unescape html', () => {
    const input = '&lt;div&gt;'
    expect(parseHeaders(input)).toBe('<div>')
  })

  test('should remove markdown tokens correctly', () => {
    const asserts = {
      // #238
      '[vue](vuejs.org)': 'vue',
      '`vue`': 'vue',
      '*vue*': 'vue',
      '**vue**': 'vue',
      '***vue***': 'vue',
      '_vue_': 'vue',
      '\\_vue\\_': '_vue_',
      '\\*vue\\*': '*vue*',

      // #564 For multiple markdown tokens
      '`a` and `b`': 'a and b',
      '***bold and italic***': 'bold and italic',
      '**bold** and *italic*': 'bold and italic'
    }
    Object.keys(asserts).forEach(input => {
      expect(parseHeaders(input)).toBe(asserts[input])
    })
  })

  test('should remove tail html correctly', () => {
    expect(removeTailHtml('# H1 <Comp></Comp>')).toBe('# H1')
    expect(removeTailHtml('# H1 <Comp a="b"></Comp>')).toBe('# H1')
    expect(removeTailHtml('# H1 <Comp/>')).toBe('# H1')
    expect(removeTailHtml('# H1 <Comp a="b"/>')).toBe('# H1')
  })

  test('should deeplyParseHeaders transformed as expected', () => {
    expect(deeplyParseHeaders('# `H1` <Comp></Comp>')).toBe('# H1')
    expect(deeplyParseHeaders('# *H1* <Comp/>')).toBe('# H1')
  })
})
