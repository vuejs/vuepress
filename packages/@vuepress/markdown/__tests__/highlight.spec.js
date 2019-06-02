import { getFragment } from '@vuepress/test-utils'
import { Md } from './util'
import highlight from '../lib/highlight.js'

const md = Md()
const mdH = Md().set({ highlight })

describe('highlight', () => {
  test('should highlight code', () => {
    const input = getFragment(__dirname, 'code.md')
    const output1 = md.render(input)
    const output2 = mdH.render(input)
    expect(output1 === output2).toBe(false)
    expect(output2).toMatchSnapshot()
  })
})
