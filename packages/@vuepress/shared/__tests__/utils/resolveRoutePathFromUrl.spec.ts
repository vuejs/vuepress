import { resolveRoutePathFromUrl } from '@vuepress/shared'

const testCases: [
  Parameters<typeof resolveRoutePathFromUrl>,
  ReturnType<typeof resolveRoutePathFromUrl>
][] = [
  // with default base `/`
  [['https://vuepress.vuejs.org/base/foo'], '/base/foo'],
  [['http://vuepress.vuejs.org/base/foo'], '/base/foo'],
  [['//vuepress.vuejs.org/base/foo'], '/base/foo'],
  [['/base/foo'], '/base/foo'],
  [['base/foo'], 'base/foo'],

  // with base `/base/`
  [['https://vuepress.vuejs.org/base/foo', '/base/'], '/foo'],
  [['http://vuepress.vuejs.org/base/foo', '/base/'], '/foo'],
  [['//vuepress.vuejs.org/base/foo', '/base/'], '/foo'],
  [['//vuepress.vuejs.org/foo/bar', '/base/'], '/foo/bar'],
  [['/base/foo', '/base/'], '/foo'],
  [['/foo/bar', '/base/'], '/foo/bar'],
  [['base/foo', '/base/'], 'base/foo'],
  [['foo/bar', '/base/'], 'foo/bar'],
]

describe('shared > resolveRoutePathFromUrl', () => {
  describe('should resolve route path correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`url: ${source[0]}, base: ${
        source[1] || '/'
      } => expected: ${expected}`, () => {
        expect(resolveRoutePathFromUrl(...source)).toEqual(expected)
      })
    })
  })
})
