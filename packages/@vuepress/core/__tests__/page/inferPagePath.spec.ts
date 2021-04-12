import { createApp, inferPagePath } from '@vuepress/core'
import { path } from '@vuepress/utils'

const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
  locales: {
    '/': {},
    '/en/': {},
    '/zh/': {},
  },
})
const appWithoutLocales = createApp({
  source,
})

const testCases: [string, ReturnType<typeof inferPagePath>][] = [
  [
    'foo.md',
    {
      pathInferred: '/foo.html',
      pathLocale: '/',
    },
  ],
  [
    'en/foo.md',
    {
      pathInferred: '/en/foo.html',
      pathLocale: '/en/',
    },
  ],
  [
    'zh/foo.md',
    {
      pathInferred: '/zh/foo.html',
      pathLocale: '/zh/',
    },
  ],
]

describe('core > page > inferPagePath', () => {
  describe('should infer page path according to relative path of page file', () => {
    testCases.forEach(([source, expected]) => {
      it(JSON.stringify(source), () => {
        expect(
          inferPagePath({
            app,
            filePathRelative: source,
          })
        ).toEqual(expected)
      })
    })
  })

  it('should use `/` as the default locale path', () => {
    expect(
      inferPagePath({
        app: appWithoutLocales,
        filePathRelative: 'en/foo/bar.md',
      })
    ).toEqual({
      pathInferred: '/en/foo/bar.html',
      pathLocale: '/',
    })
  })

  it('should handle empty file relative path', () => {
    expect(
      inferPagePath({
        app,
        filePathRelative: null,
      })
    ).toEqual({
      pathInferred: null,
      pathLocale: '/',
    })
  })
})
