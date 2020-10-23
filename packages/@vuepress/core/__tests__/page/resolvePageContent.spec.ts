import { resolvePageContent } from '@vuepress/core'

const testCases: [string, ReturnType<typeof resolvePageContent>][] = [
  [
    '',
    {
      content: '',
      frontmatterRaw: {},
      excerptRaw: '',
    },
  ],
  [
    'foobar',
    {
      content: 'foobar',
      frontmatterRaw: {},
      excerptRaw: '',
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
      frontmatterRaw: {
        foo: 'foo',
        bar: 1,
        baz: true,
      },
      excerptRaw: '\nexcerpt\n\n',
    },
  ],
]

describe('core > page > resolvePageContent', () => {
  describe('should resolve page content correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`raw: ${JSON.stringify(source)}`, () => {
        expect(resolvePageContent({ contentRaw: source })).toEqual(expected)
      })
    })
  })
})
