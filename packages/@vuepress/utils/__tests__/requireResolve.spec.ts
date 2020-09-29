import * as path from 'path'
import { requireResolve } from '@vuepress/utils'

const pathCases = [
  [
    path.join(__dirname, '__fixtures__/foo'),
    path.join(__dirname, '__fixtures__/foo/index.js'),
  ],
  [
    path.join(__dirname, '__fixtures__/foo/index'),
    path.join(__dirname, '__fixtures__/foo/index.js'),
  ],
  [
    path.join(__dirname, '__fixtures__/foo/index.js'),
    path.join(__dirname, '__fixtures__/foo/index.js'),
  ],
  [
    path.join(__dirname, '__fixtures__/bar'),
    path.join(__dirname, '__fixtures__/bar.js'),
  ],
  [
    path.join(__dirname, '__fixtures__/bar.js'),
    path.join(__dirname, '__fixtures__/bar.js'),
  ],
]

const depCases = [
  ['upath', require.resolve('upath')],
  ['@vuepress/utils', require.resolve('@vuepress/utils')],
]

describe('utils > requireResolve', () => {
  describe('should resolve path correctly', () => {
    pathCases.forEach(([source, expected]) => {
      it(source, () => {
        expect(requireResolve(source)).toBe(expected)
      })
    })
  })

  describe('should resolve dependencies correctly', () => {
    depCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(requireResolve(source)).toBe(expected)
      })
    })
  })

  describe('should return null', () => {
    it(`404 => null`, () => {
      expect(requireResolve('404')).toBeNull()
    })
  })
})
