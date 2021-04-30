import { resolvePagePath } from '@vuepress/core'

const testCases: [
  Parameters<typeof resolvePagePath>,
  ReturnType<typeof resolvePagePath>
][] = [
  // use options.path
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
    '/options/',
  ],
  [
    [
      {
        permalink: '/permalink/',
        pathInferred: '/inferred/',
        options: {
          path: '/options/',
        },
      },
    ],
    '/options/',
  ],
  [
    [
      {
        permalink: '/permalink.html',
        pathInferred: '/inferred.html',
        options: {
          path: '/options.html',
        },
      },
    ],
    '/options.html',
  ],
  // use permalink
  [
    [
      {
        permalink: '/permalink',
        pathInferred: '/inferred',
        options: {},
      },
    ],
    '/permalink/',
  ],
  [
    [
      {
        permalink: '/permalink/',
        pathInferred: '/inferred/',
        options: {},
      },
    ],
    '/permalink/',
  ],
  // user pathInferred
  [
    [
      {
        permalink: null,
        pathInferred: '/inferred',
        options: {},
      },
    ],
    '/inferred/',
  ],
  [
    [
      {
        permalink: null,
        pathInferred: '/inferred/',
        options: {},
      },
    ],
    '/inferred/',
  ],
  [
    [
      {
        permalink: null,
        pathInferred: '/inferred.html',
        options: {},
      },
    ],
    '/inferred.html',
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

  it('should throw an error', async () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() =>
      resolvePagePath({
        permalink: null,
        pathInferred: null,
        options: {},
      })
    ).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})
