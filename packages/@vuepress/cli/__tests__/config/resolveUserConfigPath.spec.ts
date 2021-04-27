import { resolveUserConfigPath } from '@vuepress/cli'
import { path } from '@vuepress/utils'

const resolveFixtures = (str: string): string =>
  path.resolve(__dirname, '../__fixtures__/config', str)

describe('cli > config > resolveUserConfigPath', () => {
  it('should resolve absolute file path correctly', () => {
    const absolutePath = resolveFixtures('custom-config.ts')
    const configFile = resolveUserConfigPath(absolutePath)
    expect(configFile).toEqual(absolutePath)
  })

  it('should resolve relative file path correctly', () => {
    const relativePath = 'custom-config.ts'
    const configFile = resolveUserConfigPath(relativePath, resolveFixtures(''))
    expect(configFile).toEqual(resolveFixtures(relativePath))
  })

  it('should throw an error if file does not exist', () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() => {
      resolveUserConfigPath('4-0-4')
    }).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})
