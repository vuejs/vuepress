import { filterHtmlBlocks } from '@vuepress/markdown'

const testCases: [string, string][] = [
  // Remove tail html
  ['# H1 <Comp></Comp>', '# H1 '],
  ['# H1<Comp></Comp>', '# H1'],
  ['# H1 <Comp a="b"></Comp>', '# H1 '],
  ['# H1<Comp a="b"></Comp>', '# H1'],
  ['# H1 <Comp/>', '# H1 '],
  ['# H1<Comp/>', '# H1'],
  ['# H1 <Comp a="b"/>', '# H1 '],
  ['# H1<Comp a="b"/>', '# H1'],

  // Reserve code-wrapped tail html
  ['# H1 `<Comp></Comp>`', '# H1 `<Comp></Comp>`'],
  ['# H1 `<Comp a="b"></Comp>`', '# H1 `<Comp a="b"></Comp>`'],
  ['# H1 `<Comp/>`', '# H1 `<Comp/>`'],
  ['# H1 `<Comp a="b"/>`', '# H1 `<Comp a="b"/>`'],

  // Remove leading html
  ['# <Comp></Comp> H1', '#  H1'],
  ['# <Comp></Comp>H1', '# H1'],
  ['# <Comp a="b"></Comp> H1', '#  H1'],
  ['# <Comp a="b"></Comp>H1', '# H1'],
  ['# <Comp/> H1', '#  H1'],
  ['# <Comp/>H1', '# H1'],
  ['# <Comp a="b"/> H1', '#  H1'],
  ['# <Comp a="b"/>H1', '# H1'],

  // Reserve code-wrapped leading html
  ['# `<Comp></Comp>` H1', '# `<Comp></Comp>` H1'],
  ['# `<Comp a="b"></Comp>` H1', '# `<Comp a="b"></Comp>` H1'],
  ['# `<Comp/>` H1', '# `<Comp/>` H1'],
  ['# `<Comp a="b"/>` H1', '# `<Comp a="b"/>` H1'],

  // Remove middle html
  ['# H1 <Comp></Comp> H2', '# H1  H2'],
  ['# H1 <Comp a="b"></Comp> H2', '# H1  H2'],
  ['# H1 <Comp/> H2', '# H1  H2'],
  ['# H1 <Comp a="b"/> H2', '# H1  H2'],

  // Reserve code-wrapped middle html
  ['# H1 `<Comp></Comp>` H2', '# H1 `<Comp></Comp>` H2'],
  ['# H1 `<Comp a="b"></Comp>` H2', '# H1 `<Comp a="b"></Comp>` H2'],
  ['# H1 `<Comp/>` H2', '# H1 `<Comp/>` H2'],
  ['# H1 `<Comp a="b"/>` H2', '# H1 `<Comp a="b"/>` H2'],
]

describe('markdown > utils > filterHtmlBlocks', () => {
  describe('should filter html blocks correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(filterHtmlBlocks(source)).toBe(expected)
      })
    })
  })
})
