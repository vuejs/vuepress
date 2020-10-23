import { filterMarkdownEscapes } from '@vuepress/markdown'

const testCases = [
  [
    '\\!\\"\\#\\$\\%\\&\\\'\\(\\)\\*\\+\\,\\-\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\\\\\]\\^\\_\\`\\{\\|\\}\\~',
    '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
  ],
  ['\\→\\A\\a\\ \\3\\φ\\«', '\\→\\A\\a\\ \\3\\φ\\«'],
]

describe('markdown > utils > filterMarkdownEscapes', () => {
  describe('should filter markdown backslash escapes and keep escaped char', () => {
    testCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(filterMarkdownEscapes(source)).toBe(expected)
      })
    })
  })
})
