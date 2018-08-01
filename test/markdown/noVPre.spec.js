import { Md, getFragment } from './util'
import highlight from '@/markdown/highlight.js'

const md = Md().set({ highlight })

describe('no-v-pre', () => {
  test('should not have v-pre with {no-v-pre}', async () => {
    const input = await getFragment('code-no-v-pre')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })
})
