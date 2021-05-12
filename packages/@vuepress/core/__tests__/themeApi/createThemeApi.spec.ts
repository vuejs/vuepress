import { createApp, createThemeApi } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/', ...args)
const source = path.resolve(__dirname, 'fake-source')

describe('core > themeApi > createThemeApi', () => {
  it('should create theme api without layouts correctly', () => {
    const app = createApp({
      source,
      theme: fixtures('themes/no-layouts.js'),
    })

    expect(createThemeApi(app)).toEqual({
      theme: {
        plugin: require(fixtures('themes/no-layouts.js')),
        layouts: [],
      },
      parentTheme: null,
      layouts: [],
    })
  })

  it('should create theme api with layouts correctly', () => {
    const app = createApp({
      source,
      theme: fixtures('themes/has-layouts.js'),
    })

    expect(createThemeApi(app)).toEqual({
      theme: {
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
      },
      parentTheme: null,
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

  it('should create theme api with parent theme correctly', () => {
    const app = createApp({
      source,
      theme: fixtures('themes/has-parent.js'),
    })

    expect(createThemeApi(app)).toEqual({
      theme: {
        plugin: require(fixtures('themes/has-parent.js')),
        layouts: [
          {
            name: 'Foo',
            path: fixtures('layouts/Foo.vue'),
          },
        ],
      },
      parentTheme: {
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
      },
      layouts: [
        {
          name: '404',
          path: fixtures('layouts/404.vue'),
        },
        {
          name: 'Layout',
          path: fixtures('layouts/Layout.vue'),
        },
        {
          name: 'Foo',
          path: fixtures('layouts/Foo.vue'),
        },
      ],
    })
  })
})
