import {
  parseHeaders,
  removeTailHtml,
  removeLeadingHtml,
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

  test('should strip leading html correctly', () => {
    expect(removeLeadingHtml('# <Comp/> H1')).toBe('# H1')
    expect(removeLeadingHtml('# <Comp></Comp> H1')).toBe('# H1')
    expect(removeLeadingHtml('#<Comp></Comp> H1')).toBe('# H1')
    expect(removeLeadingHtml('# `<Comp/>` H1')).toBe('# <code><Comp></code> H1')
    expect(removeLeadingHtml('#`<Comp/>` H1')).toBe('# <code><Comp></code> H1')
  })

  test('should deeplyParseHeaders transformed as expected', () => {
    expect(deeplyParseHeaders('# `H1` <Comp></Comp>')).toBe('# H1')
    expect(deeplyParseHeaders('# *H1* <Comp/>')).toBe('# H1')
    expect(deeplyParseHeaders('# *H1* <Badge text="test"/>')).toBe('# H1')
    expect(deeplyParseHeaders('# `<Comp/>` `H1`')).toBe('# <code><Comp></code> H1')
    expect(deeplyParseHeaders('# <Comp/> `H1` <Comp/>')).toBe('# H1')
    expect(deeplyParseHeaders('# `<Comp/>` `H1` `<Comp/>`')).toBe('# <code><Comp></code> H1 <code><Comp></code>')
  })
})
