import { Md, getFragment } from './util'
import hoist from '@/markdown/hoist.js'
import { dataReturnable } from '@/markdown/index.js'

const md = Md().set({ html: true })
const mdH = Md().set({ html: true }).use(hoist)

dataReturnable(mdH)

describe('hoist', () => {
  test('Should keep script and style when not using hoist', async () => {
    const input = await getFragment('hoist')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })

  test('Should miss script and style when using hoist', async () => {
    const input = await getFragment('hoist')
    const { html, data } = mdH.render(input)
    expect(html).toMatchSnapshot()
    expect(data).toMatchSnapshot()
  })
})
