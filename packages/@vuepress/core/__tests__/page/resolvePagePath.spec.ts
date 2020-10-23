import { resolvePagePath } from '@vuepress/core'

const testCases: [
  Parameters<typeof resolvePagePath>,
  ReturnType<typeof resolvePagePath>
][] = [
  [
    [
      {
        permalink: '/permalink',
        pathInferred: '/inferred',
        options: {
          path: '/options',
        },
      },
    ],
    '/permalink',
  ],
  [
    [
      {
        permalink: null,
        pathInferred: '/inferred',
        options: {
          path: '/options',
        },
      },
    ],
    '/inferred',
  ],
  [
    [
      {
        permalink: null,
        pathInferred: null,
        options: {
          path: '/options',
        },
      },
    ],
    '/options',
  ],
  [
    [
      {
        permalink: null,
        pathInferred: null,
        options: {},
      },
    ],
    '',
  ],
]

describe('core > page > resolvePagePath', () => {
  describe('should resolve page path correctly', () => {
    testCases.forEach(([input, expected]) => {
      it(`input: ${JSON.stringify(input)}`, async () => {
        expect(resolvePagePath(...input)).toEqual(expected)
      })
    })
  })
})
