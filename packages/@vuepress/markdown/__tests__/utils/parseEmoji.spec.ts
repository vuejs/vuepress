import { parseEmoji } from '@vuepress/markdown'

const testCases: [string, string][] = [
  [':100:', '💯'],
  [':1234::yum:', '🔢😋'],
  [':smile::blush::hugs:', '😄😊🤗'],
  [':foobar:', ':foobar:'],
  [':foo::::bar::', ':foo::::bar::'],
]

describe('markdown > utils > parseEmoji', () => {
  describe('should parse emoji correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(parseEmoji(source)).toBe(expected)
      })
    })
  })
})
