import * as MarkdownIt from 'markdown-it'
import * as anchorPlugin from 'markdown-it-anchor'
import { extractHeadersPlugin } from '@vuepress/markdown'
import type { MarkdownEnv, MarkdownHeader } from '@vuepress/markdown'

const simpleTree: [string, MarkdownHeader[]] = [
  `\
# h1
## h2
### h3
#### h4
##### h5
###### h6
`,
  [
    {
      level: 1,
      slug: 'h1',
      title: 'h1',
    },
    {
      level: 2,
      slug: 'h2',
      title: 'h2',
    },
    {
      level: 3,
      slug: 'h3',
      title: 'h3',
    },
    {
      level: 4,
      slug: 'h4',
      title: 'h4',
    },
    {
      level: 5,
      slug: 'h5',
      title: 'h5',
    },
    {
      level: 6,
      slug: 'h6',
      title: 'h6',
    },
  ],
]

const complexTree: [string, MarkdownHeader[]] = [
  `\
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
  [
    {
      level: 1,
      slug: 's1',
      title: 's1',
    },
    {
      level: 2,
      slug: 's1-1',
      title: 's1-1',
    },
    {
      level: 3,
      slug: 's1-1-1',
      title: 's1-1-1',
    },
    {
      level: 4,
      slug: 's1-1-1-1',
      title: 's1-1-1-1',
    },
    {
      level: 3,
      slug: 's1-1-2',
      title: 's1-1-2',
    },
    {
      level: 3,
      slug: 's1-1-3',
      title: 's1-1-3',
    },
    {
      level: 4,
      slug: 's1-1-3-1',
      title: 's1-1-3-1',
    },
    {
      level: 2,
      slug: 's1-2',
      title: 's1-2',
    },
    {
      level: 2,
      slug: 's1-3',
      title: 's1-3',
    },
    {
      level: 3,
      slug: 's1-3-2',
      title: 's1-3-2',
    },
    {
      level: 4,
      slug: 's1-3-2-1',
      title: 's1-3-2-1',
    },
    {
      level: 5,
      slug: 's1-3-2-1-1',
      title: 's1-3-2-1-1',
    },
    {
      level: 5,
      slug: 's1-3-2-1-2',
      title: 's1-3-2-1-2',
    },
  ],
]

describe('@vuepress/markdown > plugins > extractHeadersPlugin', () => {
  describe('default option (include h2, h3)', () => {
    const md = MarkdownIt().use(extractHeadersPlugin)

    it('simpleTree', () => {
      const env: MarkdownEnv = {}

      md.render(simpleTree[0], env)

      expect(env.headers).toEqual(
        simpleTree[1].filter(({ level }) => [2, 3].includes(level))
      )
    })

    it('complexTree', () => {
      const env: MarkdownEnv = {}

      md.render(complexTree[0], env)

      expect(env.headers).toEqual(
        complexTree[1].filter(({ level }) => [2, 3].includes(level))
      )
    })
  })

  describe('include nothing', () => {
    const md = MarkdownIt().use(extractHeadersPlugin, {
      includeHeaders: [],
    })

    it('simpleTree', () => {
      const env: MarkdownEnv = {}

      md.render(simpleTree[0], env)

      expect(env.headers).toBeUndefined()
    })

    it('complexTree', () => {
      const env: MarkdownEnv = {}

      md.render(complexTree[0], env)

      expect(env.headers).toBeUndefined()
    })
  })

  describe('include h1, h2, h3, h4', () => {
    const md = MarkdownIt().use(extractHeadersPlugin, {
      includeHeaders: ['h1', 'h2', 'h3', 'h4'],
    })

    it('simpleTree', () => {
      const env: MarkdownEnv = {}

      md.render(simpleTree[0], env)

      expect(env.headers).toEqual(
        simpleTree[1].filter(({ level }) => [1, 2, 3, 4].includes(level))
      )
    })

    it('complexTree', () => {
      const env: MarkdownEnv = {}

      md.render(complexTree[0], env)

      expect(env.headers).toEqual(
        complexTree[1].filter(({ level }) => [1, 2, 3, 4].includes(level))
      )
    })
  })

  describe('should work with anchor plugin', () => {
    const md = MarkdownIt().use(anchorPlugin).use(extractHeadersPlugin)

    it('simpleTree', () => {
      const env: MarkdownEnv = {}

      md.render(simpleTree[0], env)

      expect(env.headers).toEqual(
        simpleTree[1].filter(({ level }) => [2, 3].includes(level))
      )
    })

    it('complexTree', () => {
      const env: MarkdownEnv = {}

      md.render(complexTree[0], env)

      expect(env.headers).toEqual(
        complexTree[1].filter(({ level }) => [2, 3].includes(level))
      )
    })
  })
})
