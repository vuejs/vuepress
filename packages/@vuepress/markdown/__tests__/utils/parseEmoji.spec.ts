import { parseEmoji } from '@vuepress/markdown'

describe('markdown > utils > parseEmoji', () => {
  test('should parse emoji', () => {
    const asserts: Record<string, string> = {
      ':100:': '💯',
      ':1234::yum:': '🔢😋',
      ':smile::blush::hugs:': '😄😊🤗',
      ':foobar:': ':foobar:',
      ':foo::::bar::': ':foo::::bar::',
    }

    Object.keys(asserts).forEach((input) => {
      expect(parseEmoji(input)).toBe(asserts[input])
    })
  })
})
