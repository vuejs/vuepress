import { Md } from './util'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'

const mdP = Md().use(ins).use(mark)
// const mdP = Md().set({
//   markdown: {
//     plugins: ['ins', 'mark']
//   }
// })

const asserts = {
  'Demo ++inserted++ text.': '<p>Demo <ins>inserted</ins> text.</p>\n',
  'Demo ==marked== text.': '<p>Demo <mark>marked</mark> text.</p>\n'
}

describe('plugin', () => {
  test('should convert markdown w/ custom plugins', () => {
    for (const input in asserts) {
      const output = mdP.render(input)
      expect(output).toBe(asserts[input])
    }
  })
})
