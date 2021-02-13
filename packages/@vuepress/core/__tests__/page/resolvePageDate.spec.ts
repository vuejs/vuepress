import { resolvePageDate } from '@vuepress/core'

const testCases: [
  Parameters<typeof resolvePageDate>,
  ReturnType<typeof resolvePageDate>
][] = [
  // `frontmatter.data` is an instance of `Date`
  [
    [
      {
        frontmatter: { date: new Date(Date.UTC(2020, 9, 4)) },
        filePathRelative: null,
      },
    ],
    '2020-10-04',
  ],
  // `frontmatter.data` is a valid date string
  [
    [
      {
        frontmatter: { date: '2020-10-04' },
        filePathRelative: null,
      },
    ],
    '2020-10-04',
  ],
  // `frontmatter.data` is a invalid date string
  [
    [
      {
        frontmatter: { date: 'foobar' },
        filePathRelative: null,
      },
    ],
    '0000-00-00',
  ],
  // `frontmatter.data` is `undefined`, and relative file path is `null`
  [
    [
      {
        frontmatter: {},
        filePathRelative: null,
      },
    ],
    '0000-00-00',
  ],
  // filename is empty
  [
    [
      {
        frontmatter: {},
        filePathRelative: '',
      },
    ],
    '0000-00-00',
  ],
  // filename without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo.md',
      },
    ],
    '0000-00-00',
  ],
  // filename with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10-04-foo.md',
      },
    ],
    '2020-10-04',
  ],
  // filename with date prefix which only has year and month
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020-10-foo.md',
      },
    ],
    '2020-10-01',
  ],
  // filename without date prefix, dirname without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo/bar.md',
      },
    ],
    '0000-00-00',
  ],
  // filename with date prefix, dirname without date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: 'foo/2020-10-04-bar.md',
      },
    ],
    '2020-10-04',
  ],
  // filename and dirname with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020/10/05/2020-10-04-bar.md',
      },
    ],
    '2020-10-04',
  ],
  // dirname with date prefix
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020/10/05/bar.md',
      },
    ],
    '2020-10-05',
  ],
  // dirname with date prefix which only has year and month
  [
    [
      {
        frontmatter: {},
        filePathRelative: '2020/10/bar.md',
      },
    ],
    '2020-10-01',
  ],
  // for coverage purpose
  [
    [
      {
        frontmatter: {},
        filePathRelative: '/',
      },
    ],
    '0000-00-00',
  ],
]

describe('core > page > resolvePageDate', () => {
  describe('should resolve page date correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`raw: ${JSON.stringify(source)}`, () => {
        expect(resolvePageDate(...source)).toEqual(expected)
      })
    })
  })
})
