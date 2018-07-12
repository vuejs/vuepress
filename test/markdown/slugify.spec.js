import { Md } from './util'
import anchor from 'markdown-it-anchor'
import slugify from '@/markdown/slugify.js'

const mdS = Md().use(anchor, {
  slugify,
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#'
})

const slugifyAsserts = {
  /* markdown: id */
  '# a b': 'a-b',
  '# a-b': 'a-b',
  '# `<a>`': 'a',
  '# `<a>`b': 'a-b',
  '# `<a>` b': 'a-b'
}

describe('slugify', () => {
  test('should convert headers correctly', () => {
    for (const input in slugifyAsserts) {
      const output = mdS.render(input)
      expect(getHeading(output)).toBe(slugifyAsserts[input])
    }
  })
})

function getHeading (output) {
  return output.match(/id=\\?"([^"]*)\\?"/)[1]
}
