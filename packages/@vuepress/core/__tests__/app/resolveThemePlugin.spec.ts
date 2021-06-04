import { createApp, resolveThemePlugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/', ...args)
const app = createApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: fixtures('themes/no-layouts.js'),
})

describe('core > app > resolveThemePlugin', () => {
  it('should resolve theme plugin by absolute path correctly', () => {
    expect(resolveThemePlugin(app, fixtures('themes/no-layouts.js'))).toEqual(
      require(fixtures('themes/no-layouts.js'))
    )
  })

  it('should throw an error if the theme path does not exist', () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() => {
      resolveThemePlugin(app, fixtures('themes/4-0-4.js'))
    }).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })

  it('should throw an error if the theme name does not exist', () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() => {
      resolveThemePlugin(app, '4-0-4')
    }).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})
