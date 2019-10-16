import { getFragment } from '@vuepress/test-utils'
import { Md } from './util'
import preWrapper from '../lib/preWrapper.js'

const md = Md()
const mdP = Md().use(preWrapper)

describe('preWrapper', () => {
  test('should wrap code with triple back quote', () => {
    const input = getFragment(__dirname, 'code-prewrapper-with-quotes.md')
    const output1 = md.render(input)
    const output2 = mdP.render(input)
    expect(output1 === output2).toBe(false)
    expect(output2).toMatchSnapshot()
  })

  test('should wrap code with quadruple space', () => {
    const input = getFragment(__dirname, 'code-prewrapper-with-spaces.md')
    const output1 = md.render(input)
    const output2 = mdP.render(input)
    expect(output1 === output2).toBe(false)
    expect(output2).toMatchSnapshot()
  })
})
