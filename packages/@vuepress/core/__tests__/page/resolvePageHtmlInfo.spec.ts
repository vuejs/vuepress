import { createApp, resolvePageHtmlInfo } from '@vuepress/core'
import { path } from '@vuepress/utils'

const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
})

const testCases: [string, string][] = [
  ['/foo.html', 'foo.html'],
  ['/foo/bar.html', 'foo/bar.html'],
  ['/foo/index.html', 'foo/index.html'],
  ['/foo/bar/index.html', 'foo/bar/index.html'],
  ['/foo/', 'foo/index.html'],
  ['/foo/bar/', 'foo/bar/index.html'],
]

describe('core > page > resolvePageHtmlInfo', () => {
  describe('should resolve page html file path correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(JSON.stringify(source), () => {
        expect(
          resolvePageHtmlInfo({
            app,
            path: source,
          })
        ).toEqual({
          htmlFilePath: app.dir.dest(expected),
          htmlFilePathRelative: expected,
        })
      })
    })
  })
})
