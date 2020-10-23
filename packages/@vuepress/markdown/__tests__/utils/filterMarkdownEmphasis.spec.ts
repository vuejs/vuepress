import { filterMarkdownEmphasis } from '@vuepress/markdown'

const testCases = [
  ['*foo bar*', 'foo bar'],
  ['**foo bar**', 'foo bar'],
  ['***foo bar***', 'foo bar'],
  ['*foo bar**', 'foo bar*'],
  ['*foo bar***', 'foo bar**'],
  ['**foo bar***', 'foo bar*'],
  ['**foo bar*', '*foo bar'],
  ['***foo bar*', '**foo bar'],
  ['***foo bar**', '*foo bar'],
  ['* a *', '* a *'],
  ['** a **', '** a **'],
  ['*** a ***', '*** a ***'],
  ['*_*', '_'],
  ['**_**', '_'],
  ['***_***', '_'],
  ['**', '**'],
  ['****', '****'],
  ['******', '******'],
  ['*foo* *bar*', 'foo bar'],
  ['**foo** *bar*', 'foo bar'],
  ['_foo bar_', 'foo bar'],
  ['__foo bar__', 'foo bar'],
  ['___foo bar___', 'foo bar'],
  ['_foo bar__', 'foo bar_'],
  ['_foo bar___', 'foo bar__'],
  ['__foo bar___', 'foo bar_'],
  ['__foo bar_', '_foo bar'],
  ['___foo bar_', '__foo bar'],
  ['___foo bar__', '_foo bar'],
  ['_ foo bar _', '_ foo bar _'],
  ['__ foo bar __', '__ foo bar __'],
  ['___ foo bar ___', '___ foo bar ___'],
  ['_*_', '*'],
  ['__*__', '*'],
  ['___*___', '*'],
  ['__', '__'],
  ['____', '____'],
  ['______', '______'],
  ['_foo_ _bar_', 'foo bar'],
  ['__foo__ _bar_', 'foo bar'],
]

describe('markdown > utils > filterMarkdownEmphasis', () => {
  describe('should filter markdown emphasis syntax and keep the text', () => {
    testCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(filterMarkdownEmphasis(source)).toBe(expected)
      })
    })
  })
})
