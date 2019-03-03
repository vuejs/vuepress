import { getFragment } from '@vuepress/test-utils'
import { Md } from './util'
import preWrapper from '../lib/preWrapper.js'
import lineNumbers from '../lib/lineNumbers.js'
import highlightLines from '../lib/highlightLines.js'

// lineNumbers must be chained after preWrapper.
// since lineNumbers needs to add extra stateful class to its block wrapper.
const mdL = Md().use(preWrapper).use(lineNumbers)
const mdLH = Md().use(highlightLines).use(preWrapper).use(lineNumbers)

describe('lineNumbers', () => {
  test('should render lineNumbers', () => {
    const input = getFragment(__dirname, 'code.md')
    const output = mdL.render(input)
    expect(output).toMatchSnapshot()
  })

  test('should lineNumbers work with highlightLines', () => {
    const input = getFragment(__dirname, 'code-highlightLines-single.md')
    const output = mdLH.render(input)
    expect(output).toMatchSnapshot()
  })
})
