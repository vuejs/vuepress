import { getFragment } from '@vuepress/test-utils'
import { Md } from './util'
import hoist from '../lib/hoist.js'
import { dataReturnable } from '../index.js'

const md = Md().set({ html: true })
const mdH = Md().set({ html: true }).use(hoist)

dataReturnable(mdH)

describe('hoist', () => {
  test('Should keep script and style when not using hoist', () => {
    const input = getFragment(__dirname, 'hoist.md')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })

  test('Should miss script and style when using hoist', () => {
    const input = getFragment(__dirname, 'hoist.md')
    const { html, data } = mdH.render(input)
    expect(html).toMatchSnapshot()
    expect(data).toMatchSnapshot()
  })
})
