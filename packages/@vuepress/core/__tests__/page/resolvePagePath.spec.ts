import { resolvePagePath } from '@vuepress/core'

const testCases: [
  Parameters<typeof resolvePagePath>,
  ReturnType<typeof resolvePagePath>
][] = [
  [['/permalink', '/inferred'], '/permalink'],
  [[null, '/inferred'], '/inferred'],
  [[null, null], ''],
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
