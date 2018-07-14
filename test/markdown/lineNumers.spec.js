import { Md, getFragment } from './util'
import preWrapper from '@/markdown/preWrapper.js'
import lineNumbers from '@/markdown/lineNumbers.js'
import highlightLines from '@/markdown/highlightLines.js'

// lineNumbers must be chained after preWrapper.
// since lineNumbers needs to add extra stateful class to its block wrapper.
const mdL = Md().use(preWrapper).use(lineNumbers)
const mdLH = Md().use(highlightLines).use(preWrapper).use(lineNumbers)

describe('lineNumbers', () => {
  test('should render lineNumbers', async () => {
    const input = await getFragment('code')
    const output = mdL.render(input)
    expect(output).toMatchSnapshot()
  })

  test('should lineNumbers work with highlightLines', async () => {
    const input = await getFragment('code-highlightLines-single')
    const output = mdLH.render(input)
    expect(output).toMatchSnapshot()
  })
})
