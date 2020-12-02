import * as path from 'path'
import { hasExportDefault } from '@vuepress/utils'

const testCases: [string, boolean][] = [
  // js
  [path.join(__dirname, '__fixtures__/js/foo/index.js'), false],
  [path.join(__dirname, '__fixtures__/js/bar.js'), false],
  // ts
  // Notice: ts-jest allows us to require ts files directly,
  // and we need to do something similar to make it work in actual use
  [path.join(__dirname, '__fixtures__/ts/foo/index.ts'), true],
  [path.join(__dirname, '__fixtures__/ts/bar.ts'), false],
]

describe('utils > hasExportDefault', () => {
  describe('should check if a module has `export default` correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(JSON.stringify(source), async () => {
        const mod = require(source)
        expect(hasExportDefault(mod)).toEqual(expected)
      })
    })
  })
})
