import { unescapeHtml } from '@vuepress/markdown'

describe('markdown > utils > unescapeHtml', () => {
  it('should unescape html correctly', () => {
    expect(unescapeHtml('&lt;div&gt;')).toBe('<div>')
  })
})
