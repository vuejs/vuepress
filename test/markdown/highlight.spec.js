import { Md, getFragment } from './util'
import highlight from '@/markdown/highlight.js'

const md = Md()
const mdH = Md().set({ highlight })

describe('highlight', () => {
  test('should highlight code', async () => {
    const input = await getFragment('code')
    const output1 = md.render(input)
    const output2 = mdH.render(input)
    expect(output1 === output2).toBe(false)
    expect(output2).toMatchSnapshot()
  })
})
