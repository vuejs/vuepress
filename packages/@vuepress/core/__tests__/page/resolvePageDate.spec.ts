import { resolvePageDate } from '@vuepress/core'

const testCases: [
  Parameters<typeof resolvePageDate>,
  ReturnType<typeof resolvePageDate>
][] = [
  // `frontmatter.data` is an instance of `Date`
  [[{ date: new Date(Date.UTC(2020, 9, 4)) }, null], '2020-10-04'],
  // `frontmatter.data` is a valid date string
  [[{ date: '2020-10-04' }, null], '2020-10-04'],
  // `frontmatter.data` is a invalid date string
  [[{ date: 'foobar' }, null], '1970-01-01'],
  // `frontmatter.data` is `undefined`, and relative file path is `null`
  [[{}, null], '1970-01-01'],
  // filename is empty
  [[{}, ''], '1970-01-01'],
  // filename without date prefix
  [[{}, 'foo.md'], '1970-01-01'],
  // filename with date prefix
  [[{}, '2020-10-04-foo.md'], '2020-10-04'],
  // filename without date prefix, dirname without date prefix
  [[{}, 'foo/bar.md'], '1970-01-01'],
  // filename with date prefix, dirname without date prefix
  [[{}, 'foo/2020-10-04-bar.md'], '2020-10-04'],
  // filename with date prefix, dirname with date prefix
  [[{}, '2020-10-04-foo/2020-10-04-bar.md'], '2020-10-04'],
  // filename without date prefix, dirname with date prefix
  [[{}, '2020-10-04-foo/bar.md'], '2020-10-04'],
  // for coverage purpose
  [[{}, '/'], '1970-01-01'],
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
