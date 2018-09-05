import unescapeHtml from '../lib/unescapeHtml'

test('should unescape html', () => {
  const input = '&lt;div&gt;'
  expect(unescapeHtml(input)).toBe('<div>')
})

