import * as MarkdownIt from 'markdown-it'
import { emojiPlugin, extractTitlePlugin } from '@vuepress/markdown'
import type { MarkdownEnv } from '@vuepress/markdown'

describe('@vuepress/markdown > plugins > extractTitlePlugin', () => {
  const md = MarkdownIt().use(emojiPlugin).use(extractTitlePlugin)

  describe('should extract title from h1 heading', () => {
    const testCases = [
      ['# title from h1 :tada:', 'title from h1 🎉'],
      ['# title from h1 `foobar`', 'title from h1 foobar'],
    ]

    testCases.forEach(([source, expected]) =>
      it(source, () => {
        const env: MarkdownEnv = {}
        md.render(source, env)
        expect(env.title).toEqual(expected)
      })
    )
  })

  describe('should extract title from frontmatter', () => {
    const testCases = [
      ['title from frontmatter :tada:', 'title from frontmatter :tada:'],
      ['title from frontmatter `foobar`', 'title from frontmatter `foobar`'],
    ]

    testCases.forEach(([source, expected]) =>
      it(source, () => {
        const env: MarkdownEnv = {
          frontmatter: {
            title: source,
          },
        }
        md.render('# title from h1', env)
        expect(env.title).toEqual(expected)
      })
    )
  })

  it('should extract empty title', () => {
    const env: MarkdownEnv = {
      frontmatter: {},
    }
    md.render('', env)
    expect(env.title).toEqual('')
  })
})
