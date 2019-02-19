import {
  Md,
  getFragment
} from './util'
import snippet from '../lib/snippet.js'
import highlightLines from '../lib/highlightLines.js'

const md = Md().use(snippet)
const mdH = Md()
  .use(highlightLines)
  .use(snippet)

describe('snippet', () => {
  test('import snippet', async () => {
    const input = await getFragment('code-snippet')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with highlight single line', async () => {
    const input = await getFragment('code-snippet-highlightLines-single')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with highlight multiple lines', async () => {
    const input = await getFragment('code-snippet-highlightLines-multiple')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })

  test('import snippet with language specified as ruby', async () => {
    const input = await getFragment('code-snippet-specify-language-ruby')

    const output = md.render(input)
    expect(output).toMatchSnapshot()
    expect(output).toMatch(/ruby/)
  })

  test('import snippet with highlight lines and language specified as ruby', async () => {
    const input = await getFragment('code-snippet-highlightLines-single-specify-language-ruby')

    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })
})
