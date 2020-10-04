import { resolvePageContent } from '@vuepress/core'

const testCases: [string, ReturnType<typeof resolvePageContent>][] = [
  [
    '',
    {
      content: '',
      frontmatter: {},
      excerpt: '',
    },
  ],
  [
    'foobar',
    {
      content: 'foobar',
      frontmatter: {},
      excerpt: '',
    },
  ],
  [
    `\
---
foo: foo
bar: 1
baz: true
---

excerpt

<!-- more -->

foobar
`,
    {
      content: '\nexcerpt\n\n<!-- more -->\n\nfoobar\n',
      frontmatter: {
        foo: 'foo',
        bar: 1,
        baz: true,
      },
      excerpt: '\nexcerpt\n\n',
    },
  ],
]

describe('core > page > resolvePageContent', () => {
  describe('should resolve page content correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`raw: ${JSON.stringify(source)}`, () => {
        expect(resolvePageContent(source)).toEqual(expected)
      })
    })
  })
})
