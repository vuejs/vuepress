import removeNonCodeWrappedHTML from '../src/removeNonCodeWrappedHTML'

test('removeNonCodeWrappedHTML', () => {
  const asserts: Record<string, string> = {
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
    '# H1 `<Comp a="b"/>` H2': '# H1 `<Comp a="b"/>` H2',

    // #2688
    '# \\<ins>': '# \\<ins>'
  }

  Object.keys(asserts).forEach(input => {
    expect(removeNonCodeWrappedHTML(input)).toBe(asserts[input])
  })
})
