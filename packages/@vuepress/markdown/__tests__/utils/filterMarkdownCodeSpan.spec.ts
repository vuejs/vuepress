import { filterMarkdownCodeSpan } from '@vuepress/markdown'

const testCases = [
  ['``', '``'],
  ['`foo`', 'foo'],
  ['`foo` `bar`', 'foo bar'],
  ['``foo``', 'foo'],
  ['```foo```', 'foo'],
  ['````````foo````````', 'foo'],
  ['````````foo```````', '````````foo```````'],
  ['```````foo````````', '```````foo````````'],
  // strip leading and trailing spaces
  ['`` foo ` bar ``', 'foo ` bar'],
  ['` foo `', 'foo'],
  // stripping only happens if the space is on both sides of the string
  ['` foo`', ' foo'],
  ['`foo `', 'foo '],
]

describe('markdown > utils > filterMarkdownCodeSpan', () => {
  describe('should filter markdown inline code span syntax and keep the raw code text', () => {
    testCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(filterMarkdownCodeSpan(source)).toBe(expected)
      })
    })
  })
})
