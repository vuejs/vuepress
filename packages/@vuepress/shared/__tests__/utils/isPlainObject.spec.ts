import { isPlainObject } from '@vuepress/shared'

const testCases: [unknown, boolean][] = [
  [true, false],
  [false, false],
  ['', false],
  ['foobar', false],
  [0, false],
  [1, false],
  [[], false],
  [{}, true],
  [{ foo: 'bar' }, true],
  [Object.create(null), true],
]

describe('shared > isPlainObject', () => {
  it('should determine plain object correctly', () => {
    testCases.forEach(([source, expected]) => {
      expect(isPlainObject(source)).toBe(expected)
    })
  })
})
