import { createApp, resolveTheme } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/', ...args)

describe('core > app > resolveTheme', () => {
  it('should resolve theme without layouts correctly', () => {
    const app = createApp({
      source: path.resolve(__dirname, 'fake-source'),
      theme: fixtures('themes/no-layouts.js'),
    })

    expect(resolveTheme(app, app.options.theme)).toEqual({
      plugins: [require(fixtures('themes/no-layouts.js'))],
      layouts: {},
    })
  })

  it('should create theme api with layouts correctly', () => {
    const app = createApp({
      source: path.resolve(__dirname, 'fake-source'),
      theme: fixtures('themes/has-layouts.js'),
    })

    expect(resolveTheme(app, app.options.theme)).toEqual({
      plugins: [require(fixtures('themes/has-layouts.js'))],
      layouts: {
        Layout: fixtures('layouts/Layout.vue'),
        404: fixtures('layouts/404.vue'),
      },
    })
  })

  it('should create theme api with parent theme correctly', () => {
    const app = createApp({
      source: path.resolve(__dirname, 'fake-source'),
      theme: fixtures('themes/has-parent.js'),
    })

    expect(resolveTheme(app, app.options.theme)).toEqual({
      plugins: [
        require(fixtures('themes/has-layouts.js')),
        require(fixtures('themes/has-parent.js')),
      ],
      layouts: {
        Layout: fixtures('layouts/Layout.vue'),
        Foo: fixtures('layouts/Foo.vue'),
        404: fixtures('layouts/Foo.vue'),
      },
    })
  })

  it('should create theme api with grandparent theme correctly', () => {
    const app = createApp({
      source: path.resolve(__dirname, 'fake-source'),
      theme: fixtures('themes/has-grandparent.js'),
    })

    expect(resolveTheme(app, app.options.theme)).toEqual({
      plugins: [
        require(fixtures('themes/has-layouts.js')),
        require(fixtures('themes/has-parent.js')),
        require(fixtures('themes/has-grandparent.js')),
      ],
      layouts: {
        Layout: fixtures('layouts/Layout.vue'),
        Foo: fixtures('layouts/Foo.vue'),
        Bar: fixtures('layouts/Bar.vue'),
        404: fixtures('layouts/Bar.vue'),
      },
    })
  })
})
