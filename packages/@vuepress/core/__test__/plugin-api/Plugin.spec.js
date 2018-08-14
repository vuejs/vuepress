jest.mock('vuepress-plugin-a')
jest.mock('@org/vuepress-plugin-a')

const {
  resolvePlugin,
  resolveScopePackage
} = require('../../lib/plugin-api/util')

// const Plugin = require('../../lib/plugin-api/index')

describe('resolvePlugin', () => {
  test('should resolve scope packages correctly', () => {
    const pkg1 = resolveScopePackage('@vuepress/plugin-a')
    expect(pkg1.org).toBe('vuepress')
    expect(pkg1.name).toBe('plugin-a')
    const pkg2 = resolveScopePackage('vuepress/plugin-a')
    expect(pkg2).toBe(null)
    const pkg3 = resolveScopePackage('vuepress-plugin-a')
    expect(pkg3).toBe(null)
  })

  test('shoould return raw when function or object is given', () => {
    const plugin1 = () => {}
    const plugin2 = {}
    expect(resolvePlugin(plugin1)).toBe(plugin1)
    expect(resolvePlugin(plugin2)).toBe(plugin2)
  })

  // https://jestjs.io/docs/en/manual-mocks#mocking-node-modules
  test('shoould resolve fullname correctly', () => {
    expect(resolvePlugin('vuepress-plugin-a')).toBe('vuepress-plugin-a')
    expect(resolvePlugin('@org/vuepress-plugin-a')).toBe('@org/vuepress-plugin-a')
  })

  // https://jestjs.io/docs/en/manual-mocks#mocking-node-modules
  test('shoould resolve shortcut correctly', () => {
    expect(resolvePlugin('a')).toBe('vuepress-plugin-a')
    expect(resolvePlugin('@org/a')).toBe('@org/vuepress-plugin-a')
    // special shortcut for vuepress
    expect(resolvePlugin('@vuepress/a')).toBe('@vuepress/plugin-a')
  })
})
