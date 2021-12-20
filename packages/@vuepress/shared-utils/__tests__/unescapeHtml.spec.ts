import unescapeHtml from '../src/unescapeHtml'

test('should unescape html', () => {
  const input = `&lt;div :id=&quot;&#39;app&#39;&quot;&gt;`
  expect(unescapeHtml(input)).toBe(`<div :id="'app'">`)
})

