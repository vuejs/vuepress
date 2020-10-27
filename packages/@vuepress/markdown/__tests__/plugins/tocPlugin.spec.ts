import * as MarkdownIt from 'markdown-it'
import { tocPlugin } from '@vuepress/markdown'

const fixtures = {
  simpleTree: `\
[[toc]]
# h1
## h2
### h3
#### h4
##### h5
###### h6
`,
  complexTree: `\
[[toc]]
# s1
## s1-1
### s1-1-1
#### s1-1-1-1
### s1-1-2
### s1-1-3
#### s1-1-3-1
## s1-2
## s1-3
### s1-3-2
#### s1-3-2-1
##### s1-3-2-1-1
##### s1-3-2-1-2
`,
  reversedTree: `\
[[toc]]
###### h6
##### h5
#### h4
### h3
## h2
# h1
`,
}

describe('@vuepress/markdown > plugins > tocPlugin', () => {
  describe('should render toc with default option (h2, h3)', () => {
    const md = MarkdownIt().use(tocPlugin)

    Object.entries(fixtures).forEach(([name, source]) => {
      it(name, () => {
        const result = md.render(source)
        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('should render toc (h1, h2, h3, h4)', () => {
    const md = MarkdownIt().use(tocPlugin, {
      level: [1, 2, 3, 4],
    })

    Object.entries(fixtures).forEach(([name, source]) => {
      it(name, () => {
        const result = md.render(source)
        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('should render toc with RouterLink', () => {
    const md = MarkdownIt().use(tocPlugin, {
      linkTag: 'RouterLink',
    })

    Object.entries(fixtures).forEach(([name, source]) => {
      it(name, () => {
        const result = md.render(source)
        expect(result).toMatchSnapshot()
      })
    })
  })
})
