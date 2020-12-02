import * as path from 'path'
import { requireResolve } from '@vuepress/utils'

const pathCases: [string, string][] = [
  // js
  [
    path.join(__dirname, '__fixtures__/js/foo'),
    path.join(__dirname, '__fixtures__/js/foo/index.js'),
  ],
  [
    path.join(__dirname, '__fixtures__/js/foo/index'),
    path.join(__dirname, '__fixtures__/js/foo/index.js'),
  ],
  [
    path.join(__dirname, '__fixtures__/js/foo/index.js'),
    path.join(__dirname, '__fixtures__/js/foo/index.js'),
  ],
  [
    path.join(__dirname, '__fixtures__/js/bar'),
    path.join(__dirname, '__fixtures__/js/bar.js'),
  ],
  [
    path.join(__dirname, '__fixtures__/js/bar.js'),
    path.join(__dirname, '__fixtures__/js/bar.js'),
  ],
  // ts
  // Notice: ts-jest allows us to require.resolve ts files directly,
  // and we need to do something similar to make it work in actual use
  [
    path.join(__dirname, '__fixtures__/ts/foo'),
    path.join(__dirname, '__fixtures__/ts/foo/index.ts'),
  ],
  [
    path.join(__dirname, '__fixtures__/ts/foo/index'),
    path.join(__dirname, '__fixtures__/ts/foo/index.ts'),
  ],
  [
    path.join(__dirname, '__fixtures__/ts/foo/index.ts'),
    path.join(__dirname, '__fixtures__/ts/foo/index.ts'),
  ],
  [
    path.join(__dirname, '__fixtures__/ts/bar'),
    path.join(__dirname, '__fixtures__/ts/bar.ts'),
  ],
  [
    path.join(__dirname, '__fixtures__/ts/bar.ts'),
    path.join(__dirname, '__fixtures__/ts/bar.ts'),
  ],
]

const depCases: [string, string][] = [
  ['upath', require.resolve('upath')],
  ['@vuepress/utils', require.resolve('@vuepress/utils')],
]

const nullCases: [string, null][] = [
  ['404', null],
  ['./404', null],
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
    nullCases.forEach(([source, expected]) => {
      it(`${source} => ${expected}`, () => {
        expect(requireResolve(source)).toBe(expected)
      })
    })
  })
})
