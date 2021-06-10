import { createAppEnv, createAppOptions } from '@vuepress/core'

const source = '/foo'

const testCases: [
  Parameters<typeof createAppEnv>,
  ReturnType<typeof createAppEnv>
][] = [
  [
    [createAppOptions({ source }), false],
    {
      isBuild: false,
      isDev: true,
      isDebug: false,
    },
  ],
  [
    [createAppOptions({ source, debug: true }), false],
    {
      isBuild: false,
      isDev: true,
      isDebug: true,
    },
  ],
  [
    [createAppOptions({ source }), true],
    {
      isBuild: true,
      isDev: false,
      isDebug: false,
    },
  ],
]

describe('core > app > createAppEnv', () => {
  describe('should create app env correctly', () => {
    testCases.forEach(([params, expected], i) => {
      it(`case ${i}`, () => {
        expect(createAppEnv(...params)).toEqual(expected)
      })
    })
  })
})
