import { parseHeaderDeeply } from '@vuepress/markdown'

describe('markdown > utils > parseHeaderDeeply', () => {
  test('should parse header deeply', () => {
    const asserts: Record<string, string> = {
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
      '# `H1` `<Comp/>` `H2`': '# H1 <Comp/> H2',
    }

    Object.keys(asserts).forEach((input) => {
      expect(parseHeaderDeeply(input)).toBe(asserts[input])
    })
  })
})
