import { filterMarkdownLinks } from '@vuepress/markdown'

const testCases = [
  ['[link](/uri "title")', 'link'],
  ['[link](/uri)', 'link'],
  ['[link]()', 'link'],
  ['[link](<>)', 'link'],
  ['[link](/my uri)', 'link'],
  ['[link](</my uri>)', 'link'],
  ['[a](<b)c>)', 'a'],
  ['[link](<foo\\>)', 'link'],
  ['[link](\\(foo\\))', 'link'],
  ['[link](foo(and(bar)))', 'link'],
  ['[link](foo\\(and\\(bar\\))', 'link'],
  ['[link](<foo(and(bar)>)', 'link'],
  ['[link](foo\\)\\:)', 'link'],
  ['[link](#fragment)', 'link'],
  ['[link](http://example.com#fragment)', 'link'],
  ['[link](http://example.com?foo=3#frag)', 'link'],
  ['[link](foo\\bar)', 'link'],
]

describe('markdown > utils > filterMarkdownLinks', () => {
  describe('should filter markdown link syntax and keep the link text', () => {
    testCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(filterMarkdownLinks(source)).toBe(expected)
      })
    })
  })
})
