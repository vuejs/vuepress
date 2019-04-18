import { getFragment } from '@vuepress/test-utils'
import { Md } from './util'
import highlightLines from '../lib/highlightLines.js'

const md = Md()
const mdH = Md().use(highlightLines)

describe('highlightLines', () => {
  test('should the output not change when highlightLines is not detected', () => {
    const input = getFragment(__dirname, 'code.md')
    const output1 = md.render(input)
    const output2 = mdH.render(input)
    expect(output1).toBe(output2)
  })

  test('highlight single line', () => {
    const input = getFragment(__dirname, 'code-highlightLines-single.md')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })

  test('highlight multiple lines', () => {
    const input = getFragment(__dirname, 'code-highlightLines-multiple.md')
    const output = mdH.render(input)
    expect(output).toMatchSnapshot()
  })
})
