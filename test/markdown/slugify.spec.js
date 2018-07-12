import { Md } from './util'
import anchor from 'markdown-it-anchor'
import slugify from '@/markdown/slugify.js'

const mdS = Md().use(anchor, {
  slugify,
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#'
})

const asserts = {
  /* header: slug */
  '# a b': 'a-b',
  '# a-b': 'a-b',
  '# `<a>`': 'a',
  '# `<a>`b': 'a-b',
  '# `<a>` b': 'a-b'
}

describe('slugify', () => {
  test('should convert headers to slug correctly', () => {
    for (const input in asserts) {
      const output = mdS.render(input)
      expect(getSlug(output)).toBe(asserts[input])
    }
  })
})

function getSlug (output) {
  return output.match(/id=\\?"([^"]*)\\?"/)[1]
}
