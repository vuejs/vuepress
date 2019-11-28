jest.mock('vuepress-plugin-a')
jest.mock('@org/vuepress-plugin-a')
jest.mock('@vuepress/plugin-a')

jest.mock('vuepress-theme-a')
jest.mock('@org/vuepress-theme-a')
jest.mock('@vuepress/theme-a')

import path from 'path'
import {
  getThemeResolver,
  getPluginResolver,
  resolveScopePackage
} from '../src/moduleResolver'
import hash from 'hash-sum'

const MOCK_RELATIVE = '../../../../__mocks__'

function loadMockModule (name: string) {
  return require(`${MOCK_RELATIVE}/${name}`)
}

function resolveMockModule (name: string) {
  return require.resolve(path.resolve(__dirname, `${MOCK_RELATIVE}/${name}/`))
}

const fixturesDir = path.resolve(__dirname, 'fixtures')
const themeResolver = getThemeResolver(fixturesDir)
const pluginResolver = getPluginResolver(fixturesDir)

const prevCwd = process.cwd()
beforeAll(() => {
  process.chdir(path.resolve(__dirname, 'fixtures'))
})

afterAll(() => {
  process.chdir(prevCwd)
})

describe('resolveScopePackage', () => {
  test('corrent format', () => {
    const pkg = resolveScopePackage('@vuepress/plugin-a')
    expect(pkg.org).toBe('vuepress')
    expect(pkg.name).toBe('plugin-a')
  })

  test('incorrect format', () => {
    const pkg2 = resolveScopePackage('vuepress/plugin-a')
    expect(pkg2).toEqual({ 'name': '', 'org': '' })

    const pkg3 = resolveScopePackage('vuepress-plugin-a')
    expect(pkg3).toEqual({ 'name': '', 'org': '' })
  })
})

const getBaseAsserts = (type: string) => [
  { input: 'a', output: ['a', `vuepress-${type}-a`] },
  { input: `vuepress-${type}-a`, output: ['a', `vuepress-${type}-a`] },
  { input: '@vuepress/a', output: ['@vuepress/a', `@vuepress/${type}-a`] },
  { input: '@org/a', output: ['@org/a', `@org/vuepress-${type}-a`] }
]

describe('normalizeRequest', () => {
  const normalizeRequest = pluginResolver.normalizeRequest.bind(pluginResolver)

  test('base', () => {
    const asserts = [
      { input: null, output: [null, null] },
      { input: undefined, output: [null, null] },
      ...getBaseAsserts('plugin')
    ]

    for (const { input, output } of asserts) {
      const { shortcut, name } = normalizeRequest(input)
      expect([shortcut, name]).toEqual(output)
    }
  })

  test('object', () => {
    const req = {}
    const { name, shortcut } = normalizeRequest(req)
    expect(shortcut).toBe(`anonymous-${hash(req)}`)
    expect(name).toBe(`vuepress-plugin-anonymous-${hash(req)}`)
  })

  test('object - should respect name', () => {
    const req = { name: 'a' }
    const { name, shortcut } = normalizeRequest(req)
    expect(shortcut).toBe('a')
    expect(name).toBe(`vuepress-plugin-a`)
  })
})

describe('resolvePlugin', () => {
  const resolvePlugin = pluginResolver.resolve.bind(pluginResolver)

  test('function', () => {
    const plugin = () => {
      /* noop */
    }
    const resolved = resolvePlugin(plugin)
    expect(resolved.entry).toBe(plugin)
    expect(resolved.fromDep).toBe(false)
  })

  test('object', () => {
    const plugin = {}
    const resolved = resolvePlugin(plugin)
    expect(resolved.entry).toBe(plugin)
    expect(resolved.fromDep).toBe(false)
  })

  describe('from dep', () => {
    const asserts = getBaseAsserts('plugin')
    for (const { input, output } of asserts) {
      test(input, () => {
        const [, name] = output
        const resolved = resolvePlugin(input)
        expect(resolved.entry).toBe(loadMockModule(name))
      })
    }
  })

  test('relative path', () => {
    const resolved = resolvePlugin('./plugin-a')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(resolved.entry).toBe(require('./fixtures/plugin-a'))
  })

  test('aosolute path', () => {
    const resolved = resolvePlugin(path.resolve(__dirname, 'fixtures/plugin-a'))
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(resolved.entry).toBe(require('./fixtures/plugin-a'))
  })

  test('plugin that cannot be resolved', () => {
    expect(resolvePlugin('c').entry).toBe(null)
  })
})

describe('resolveTheme', () => {
  const resolveTheme = themeResolver.resolve.bind(themeResolver)

  describe('from dep', () => {
    const asserts = getBaseAsserts('theme')
    for (const { input, output } of asserts) {
      test(input, () => {
        const [, name] = output
        const resolved = resolveTheme(input)
        expect(resolved.entry).toBe(resolveMockModule(name))
      })
    }
  })

  test('relative path', () => {
    const resolved = resolveTheme('./theme-a')
    expect(resolved.entry).toBe(path.resolve(__dirname, './fixtures/theme-a'))
  })

  test('absolute path', () => {
    const resolved = resolveTheme(path.resolve(__dirname, 'fixtures/theme-a'))
    expect(resolved.entry).toBe(path.resolve(__dirname, './fixtures/theme-a'))
  })

  test('theme that cannot be resolved', () => {
    expect(resolveTheme('c').entry).toBe(null)
  })
})
