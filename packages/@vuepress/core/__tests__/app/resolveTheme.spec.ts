import { createBaseApp, resolveTheme } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/', ...args)
const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: fixtures('themes/empty.js'),
})

describe('core > app > resolveTheme', () => {
  it('should resolve theme by absolute path correctly', () => {
    expect(resolveTheme(app, fixtures('themes/empty.js'))).toEqual(
      require(fixtures('themes/empty.js'))
    )
  })

  it('should throw an error if the theme path does not exist', () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() => {
      resolveTheme(app, fixtures('themes/4-0-4.js'))
    }).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })

  it('should throw an error if the theme name does not exist', () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() => {
      resolveTheme(app, '4-0-4')
    }).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})
