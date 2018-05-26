import { Md, getFragment } from './util'
import highlightLines from '@/markdown/highlightLines.js'

const md = Md()
const mdh = Md().use(highlightLines)

describe('highlightLines', () => {
  test('should the output not change when highlightLines is not detected', async () => {
    const input = await getFragment('code')
    const output1 = md.render(input)
    const output2 = mdh.render(input)
    expect(output1).toBe(output2)
  })

  test('highlight single line', async () => {
    const input = await getFragment('code-highlightLines-single')
    const output = mdh.render(input)
    expect(output).toMatchSnapshot()
  })

  test('highlight multiple lines', async () => {
    const input = await getFragment('code-highlightLines-multiple')
    const output = mdh.render(input)
    expect(output).toMatchSnapshot()
  })
})
