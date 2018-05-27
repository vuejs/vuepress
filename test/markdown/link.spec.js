import { Md } from './util'
import link from '@/markdown/link.js'
import { dataReturnable } from '@/markdown/index.js'

const mdL = Md().use(link, {
  target: '_blank',
  rel: 'noopener noreferrer'
})

dataReturnable(mdL)

const internalLinkAsserts = {
  // START abosolute path usage
  '/': '/',

  '/foo/': '/foo/',
  '/foo/#hash': '/foo/#hash',

  '/foo/two.md': '/foo/two.html',
  '/foo/two.html': '/foo/two.html',
  // END abosolute path usage

  // START relative path usage
  'README.md': './',
  './README.md': './',

  'index.md': './',
  './index.md': './',

  'one.md': './one.html',
  './one.md': './one.html',

  'foo/README.md': './foo/',
  './foo/README.md': './foo/',

  'foo/README.md#hash': './foo/#hash',
  './foo/README.md#hash': './foo/#hash',

  '../README.md': './../',
  '../README.md#hash': './../#hash',

  '../foo.md': './../foo.html',
  '../foo.md#hash': './../foo.html#hash',

  '../foo/one.md': './../foo/one.html',
  '../foo/one.md#hash': './../foo/one.html#hash'
  // END relative path usage
}

const externalLinks = [
  '[vue](https://vuejs.org/)',
  '[vue](http://vuejs.org/)',
  '[some **link** with `code`](https://google.com)' // #496
]

describe('link', () => {
  test('should convert internal links to router links correctly', () => {
    for (const before in internalLinkAsserts) {
      const input = `[${before}](${before})`
      const output = mdL.render(input)
      const after = getCompiledLink(output)
      expect(after).toBe(internalLinkAsserts[before])
    }
  })

  test('should render external links correctly', () => {
    for (const link of externalLinks) {
      const { html } = mdL.render(link)
      expect(html).toMatchSnapshot()
    }
  })
})

function getCompiledLink (output) {
  const { data: { routerLinks }} = output
  return routerLinks[0]
}
