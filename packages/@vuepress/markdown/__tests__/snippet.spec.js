import { Md, getFragment } from './util'
import snippet from '../lib/snippet.js'
import highlightLines from '../lib/highlightLines.js'

const md = Md().use(snippet)
const mdH = Md().use(snippet).use(highlightLines)

describe('snippet', () => {
  test('import snippet', async () => {
    const input = await getFragment('code-snippet')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with lang option', async () => {
    const input = await getFragment('code-snippet-with-lang')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
    expect(output).toMatch(/language-ruby/)
  })

  test('import snippet with line transclusion', async () => {
    const input = await getFragment('code-snippet-transclude-line')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
    expect(output).not.toMatch(/template|script/)
    expect(output).toMatch(/style/)
  })

  test('import snippet with comment/block transclusion => :::', async () => {
    const input = await getFragment('code-snippet-transclude-with')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
    expect(output).not.toMatch(/template|script|style/)
    expect(output).toMatch(/export default/)
  })

  test('import snippet with tag transclusion => style', async () => {
    const input = await getFragment('code-snippet-transclude-tag')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
    expect(output).not.toMatch(/template|script/)
    expect(output).toMatch(/style/)
  })

  test('import snippet with highlight single line', async () => {
    const input = await getFragment('code-snippet-highlightLines-single')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
    expect(output).toMatch(/highlighted/)
  })

  test('import snippet with highlight multiple lines', async () => {
    const input = await getFragment('code-snippet-highlightLines-multiple')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
    expect(output).toMatch(/highlighted/)
  })
})
