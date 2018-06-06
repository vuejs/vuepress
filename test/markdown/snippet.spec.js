import { Md, getFragment } from './util'
import snippet from '@/markdown/snippet.js'
import highlightLines from '@/markdown/highlightLines.js'

const md = Md().use(snippet)
const mdH = Md().use(snippet).use(highlightLines)

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
})
