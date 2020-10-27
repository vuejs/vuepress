import * as MarkdownIt from 'markdown-it'
import { extractHeadersPlugin } from '@vuepress/markdown'
import type { MarkdownEnv } from '@vuepress/markdown'

const fixtures = {
  simpleTree: `\
  # h1
  ## h2
  ### h3
  #### h4
  ##### h5
  ###### h6
`,
  complexTree: `\
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
###### h6
##### h5
#### h4
### h3
## h2
# h1
`,
}

describe('@vuepress/markdown > plugins > extractHeadersPlugin', () => {
  describe('should extract headers with default option (h2, h3)', () => {
    const md = MarkdownIt().use(extractHeadersPlugin)

    Object.entries(fixtures).forEach(([name, source]) => {
      it(name, () => {
        const env: MarkdownEnv = {}
        md.render(source, env)
        expect(env.headers).toMatchSnapshot()
      })
    })
  })

  describe('should extract nothing', () => {
    const md = MarkdownIt().use(extractHeadersPlugin, {
      level: [],
    })

    Object.entries(fixtures).forEach(([name, source]) => {
      it(name, () => {
        const env: MarkdownEnv = {}
        md.render(source, env)
        expect(env.headers).toEqual([])
      })
    })
  })

  describe('should extract headers (h1, h2, h3, h4)', () => {
    const md = MarkdownIt().use(extractHeadersPlugin, {
      level: [1, 2, 3, 4],
    })

    Object.entries(fixtures).forEach(([name, source]) => {
      it(name, () => {
        const env: MarkdownEnv = {}
        md.render(source, env)
        expect(env.headers).toMatchSnapshot()
      })
    })
  })
})
