import { getFragment } from '@vuepress/test-utils'
import { Md } from './util'
import snippet from '../lib/snippet.js'
import highlightLines from '../lib/highlightLines.js'

const md = Md().use(snippet)
const mdH = Md().use(highlightLines).use(snippet)

describe('snippet', () => {
  test('import snippet', () => {
    const input = getFragment(__dirname, 'code-snippet.md')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with highlight single line', () => {
    const input = getFragment(__dirname, 'code-snippet-highlightLines-single.md')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with highlight multiple lines', () => {
    const input = getFragment(__dirname, 'code-snippet-highlightLines-multiple.md')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with highlight single and multiple lines', () => {
    const input = getFragment(__dirname, 'code-snippet-highlightLines-single-and-multiple.md')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippets when the file has a space in the file path', () => {
    const input = getFragment(__dirname, 'code-snippet-with-space-in-path.md')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with region', () => {
    const input = getFragment(__dirname, 'code-snippet-with-region.md')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with region and highlight', () => {
    const input = getFragment(__dirname, 'code-snippet-with-region-and-highlight.md')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with region and single line highlight > 10', () => {
    const input = getFragment(__dirname, 'code-snippet-with-region-and-single-highlight.md')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with indented region', () => {
    const input = getFragment(__dirname, 'code-snippet-with-indented-region.md')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })
})
