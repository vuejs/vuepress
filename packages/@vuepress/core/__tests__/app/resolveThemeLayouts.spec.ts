import { resolveThemeLayouts } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fixtures = (...args: string[]) =>
  path.resolve(__dirname, '../__fixtures__/layouts', ...args)

const testCases: [
  Parameters<typeof resolveThemeLayouts>[0],
  ReturnType<typeof resolveThemeLayouts>
][] = [
  // `layouts` is not provided
  [undefined, {}],
  // `layouts` is an object
  [
    {
      Layout: fixtures('Layout.vue'),
      404: fixtures('404.vue'),
    },
    {
      Layout: fixtures('Layout.vue'),
      404: fixtures('404.vue'),
    },
  ],
  // `layouts` is an absolute path
  [
    fixtures(),
    {
      Layout: fixtures('Layout.vue'),
      Foo: fixtures('Foo.vue'),
      Bar: fixtures('Bar.vue'),
      404: fixtures('404.vue'),
    },
  ],
]

describe('core > app > resolveThemeLayouts', () => {
  describe('should resolve theme layouts correctly', () => {
    testCases.forEach(([source, expected]) => {
      it(`${typeof source}`, () => {
        expect(resolveThemeLayouts(source)).toEqual(expected)
      })
    })
  })

  it('should throw an error if the layout directory does not exist', () => {
    const consoleError = console.error
    console.error = jest.fn()

    expect(() => {
      resolveThemeLayouts('4-0-4')
    }).toThrow()
    expect(console.error).toHaveBeenCalled()

    console.error = consoleError
  })
})
