import { getFragment } from '@vuepress/test-utils'
import { Md } from './util'
import emoji from 'markdown-it-emoji'
import anchor from 'markdown-it-anchor'
import toc from '../lib/tableOfContents'
import slugify from '../../shared-utils/lib/slugify.js'

const md = Md()
  .set({ html: true })
  .use(emoji)
  .use(anchor, {
    slugify,
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '#'
  }).use(toc)

describe('tableOfContents', () => {
  test('should generate unique and valid links with html and emoji', () => {
    const input = getFragment(__dirname, 'toc.md')
    const output = md.render(input)
    expect(output).toMatchSnapshot()
  })
})
