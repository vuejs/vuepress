import { createMarkdown } from '@vuepress/markdown'

describe('@vuepress/markdown > markdown', () => {
  describe('options', () => {
    describe('anchor', () => {
      // TODO
    })

    describe('toc', () => {
      // TODO
    })

    describe('extractHeaders', () => {
      // TODO
    })

    describe('hoistTags', () => {
      // TODO
    })

    describe('links', () => {
      // TODO
    })
  })

  describe('e2e', () => {
    describe('anchor', () => {
      // TODO
    })

    describe('emoji', () => {
      it('should parse emoji', () => {
        const md = createMarkdown()

        const rendered = md.render(':smile:')

        expect(rendered).toBe('<p>😄</p>\n')
      })
    })

    describe('toc', () => {
      // TODO
    })
  })
})
