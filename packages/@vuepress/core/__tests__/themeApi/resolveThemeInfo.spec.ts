import { createApp, resolveThemeInfo } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/', ...args)
const source = path.resolve(__dirname, 'fake-source')
const app = createApp({
  source,
})

describe('core > themeApi > resolveThemeInfo', () => {
  it('should resolve theme info by absolute path correctly > no layouts', () => {
    expect(resolveThemeInfo(app, fixtures('themes/no-layouts.js'))).toEqual({
      plugin: require(fixtures('themes/no-layouts.js')),
      layouts: [],
    })
  })

  it('should resolve theme info by absolute path correctly > has layouts', () => {
    expect(resolveThemeInfo(app, fixtures('themes/has-layouts.js'))).toEqual({
      plugin: require(fixtures('themes/has-layouts.js')),
      layouts: [
        {
          name: '404',
          path: fixtures('layouts/404.vue'),
        },
        {
          name: 'Layout',
          path: fixtures('layouts/Layout.vue'),
        },
      ],
    })
  })

  it('should throw an error if the theme path does not exist', () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() => {
      resolveThemeInfo(app, fixtures('themes/4-0-4.js'))
    }).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })

  it('should throw an error if the theme name does not exist', () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() => {
      resolveThemeInfo(app, '4-0-4')
    }).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})
