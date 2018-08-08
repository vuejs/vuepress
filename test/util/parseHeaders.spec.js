import {
  parseHeaders,
  removeNonCodeWrappedHTML,
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

  test('should remove non-code-wrapped html correctly', () => {
    const asserts = {
      // Remove tail html
      '# H1 <Comp></Comp>': '# H1 ',
      '# H1<Comp></Comp>': '# H1',
      '# H1 <Comp a="b"></Comp>': '# H1 ',
      '# H1<Comp a="b"></Comp>': '# H1',
      '# H1 <Comp/>': '# H1 ',
      '# H1<Comp/>': '# H1',
      '# H1 <Comp a="b"/>': '# H1 ',
      '# H1<Comp a="b"/>': '# H1',

      // Reserve code-wrapped tail html
      '# H1 `<Comp></Comp>`': '# H1 `<Comp></Comp>`',
      '# H1 `<Comp a="b"></Comp>`': '# H1 `<Comp a="b"></Comp>`',
      '# H1 `<Comp/>`': '# H1 `<Comp/>`',
      '# H1 `<Comp a="b"/>`': '# H1 `<Comp a="b"/>`',

      // Remove leading html
      '# <Comp></Comp> H1': '#  H1',
      '# <Comp></Comp>H1': '# H1',
      '# <Comp a="b"></Comp> H1': '#  H1',
      '# <Comp a="b"></Comp>H1': '# H1',
      '# <Comp/> H1': '#  H1',
      '# <Comp/>H1': '# H1',
      '# <Comp a="b"/> H1': '#  H1',
      '# <Comp a="b"/>H1': '# H1',

      // Reserve code-wrapped leading html
      '# `<Comp></Comp>` H1': '# `<Comp></Comp>` H1',
      '# `<Comp a="b"></Comp>` H1': '# `<Comp a="b"></Comp>` H1',
      '# `<Comp/>` H1': '# `<Comp/>` H1',
      '# `<Comp a="b"/>` H1': '# `<Comp a="b"/>` H1',

      // Remove middle html
      '# H1 <Comp></Comp> H2': '# H1  H2',
      '# H1 <Comp a="b"></Comp> H2': '# H1  H2',
      '# H1 <Comp/> H2': '# H1  H2',
      '# H1 <Comp a="b"/> H2': '# H1  H2',

      // Reserve code-wrapped middle html
      '# H1 `<Comp></Comp>` H2': '# H1 `<Comp></Comp>` H2',
      '# H1 `<Comp a="b"></Comp>` H2': '# H1 `<Comp a="b"></Comp>` H2',
      '# H1 `<Comp/>` H2': '# H1 `<Comp/>` H2',
      '# H1 `<Comp a="b"/>` H2': '# H1 `<Comp a="b"/>` H2'
    }

    Object.keys(asserts).forEach(input => {
      expect(removeNonCodeWrappedHTML(input)).toBe(asserts[input])
    })
  })

  test('should deeplyParseHeaders transformed as expected', () => {
    const asserts = {
      // Remove tail html
      '# `H1` <Comp></Comp>': '# H1',
      '# *H1* <Comp/>': '# H1',

      // Reserve code-wrapped tail html
      '# `H1` `<Comp></Comp>`': '# H1 <Comp></Comp>',
      '# *H1* `<Comp/>`': '# H1 <Comp/>',

      // Remove leading html
      '# <Comp></Comp> `H1`': '#  H1',
      '# <Comp/> *H1*': '#  H1',

      // Reserve code-wrapped leading html
      '# `<Comp></Comp>` `H1`': '# <Comp></Comp> H1',
      '# `<Comp/>` *H1*': '# <Comp/> H1',

      // Remove middle html
      '# `H1` <Comp></Comp> `H2`': '# H1  H2',
      '# `H1` <Comp/> `H2`': '# H1  H2',

      // Reserve middle html
      '# `H1` `<Comp></Comp>` `H2`': '# H1 <Comp></Comp> H2',
      '# `H1` `<Comp/>` `H2`': '# H1 <Comp/> H2'
    }

    Object.keys(asserts).forEach(input => {
      expect(deeplyParseHeaders(input)).toBe(asserts[input])
    })
  })
})
