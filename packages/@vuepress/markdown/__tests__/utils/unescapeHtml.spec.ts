import { unescapeHtml } from '@vuepress/markdown'

describe('markdown > utils > unescapeHtml', () => {
  test('should unescape html', () => {
    const input = '&lt;div&gt;'
    expect(unescapeHtml(input)).toBe('<div>')
  })
})
