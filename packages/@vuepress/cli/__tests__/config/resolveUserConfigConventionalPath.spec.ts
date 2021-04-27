import { resolveUserConfigConventionalPath } from '@vuepress/cli'
import { path } from '@vuepress/utils'

const resolveFixtures = (str: string): string =>
  path.resolve(__dirname, '../__fixtures__/config/convention', str)

const testCases: [string, string][] = [
  [resolveFixtures('case1'), 'vuepress.config.ts'],
  [resolveFixtures('case2'), 'vuepress.config.js'],
  [resolveFixtures('case3'), '.vuepress/config.ts'],
  [resolveFixtures('case4'), '.vuepress/config.js'],
]

describe('cli > config > resolveUserConfigConventionalPath', () => {
  describe('should resolve conventional config file correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(expected, () => {
        const configFile = resolveUserConfigConventionalPath(source, source)
        expect(configFile).toEqual(path.resolve(source, expected))
      })
    })
  })
})
