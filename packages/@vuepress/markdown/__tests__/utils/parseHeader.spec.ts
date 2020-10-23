import { parseHeader } from '@vuepress/markdown'

const testCases: [string, string][] = [
  [
    '`foo` *bar* _baz_ :tada: `<Badge text="alpha">` <Badge text="beta" />',
    'foo bar baz 🎉 <Badge text="alpha"> <Badge text="beta" />',
  ],
]

describe('markdown > utils > parseHeader', () => {
  describe('should parse header correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(parseHeader(source)).toBe(expected)
      })
    })
  })
})
