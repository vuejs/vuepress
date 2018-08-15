jest.mock('vuepress-plugin-a')
jest.mock('@org/vuepress-plugin-a')

const {
  resolvePlugin,
  hydratePlugin,
  resolveScopePackage
} = require('../../lib/plugin-api/util')

function resolveMockModule (name) {
  return require(`../../../../../__mocks__/${name}`)
}

// const Plugin = require('../../lib/plugin-api/index')

describe('resolvePlugin', () => {
  test('should resolve scope packages correctly.', () => {
    const pkg1 = resolveScopePackage('@vuepress/plugin-a')
    expect(pkg1.org).toBe('vuepress')
    expect(pkg1.name).toBe('plugin-a')

    const pkg2 = resolveScopePackage('vuepress/plugin-a')
    expect(pkg2).toBe(null)

    const pkg3 = resolveScopePackage('vuepress-plugin-a')
    expect(pkg3).toBe(null)
  })

  test('shoould resolve local plugin as expected.', () => {
    const plugin1 = () => {}
    const plugin2 = {}
    expect(resolvePlugin(plugin1)).toEqual({
      name: 'plugin1',
      shortcut: 'plugin1',
      config: plugin1,
      isLocal: true
    })
    expect(resolvePlugin(plugin2)).toEqual({
      name: 'anonymous-1',
      shortcut: 'anonymous-1',
      config: plugin2,
      isLocal: true
    })
  })

  test('shoould resolve fullname usage correctly.', () => {
    let plugin = resolvePlugin('vuepress-plugin-a')
    expect(plugin.name).toBe('vuepress-plugin-a')
    expect(plugin.shortcut).toBe('a')
    expect(plugin.config).toBe(resolveMockModule('vuepress-plugin-a'))

    plugin = resolvePlugin('@org/vuepress-plugin-a')
    expect(plugin.name).toBe('@org/vuepress-plugin-a')
    expect(plugin.shortcut).toBe('@org/a')
    expect(plugin.config).toBe(resolveMockModule('@org/vuepress-plugin-a'))
  })

  test('shoould resolve shortcut usage correctly.', () => {
    // normal package
    let plugin = resolvePlugin('a')
    expect(plugin.name).toBe('vuepress-plugin-a')
    expect(plugin.shortcut).toBe('a')
    expect(plugin.config).toBe(resolveMockModule('vuepress-plugin-a'))

    // scope packages
    plugin = resolvePlugin('@org/a')
    expect(plugin.name).toBe('@org/vuepress-plugin-a')
    expect(plugin.shortcut).toBe('@org/a')
    expect(plugin.config).toBe(resolveMockModule('@org/vuepress-plugin-a'))

    // special case for @vuepress package
    plugin = resolvePlugin('@vuepress/a')
    expect(plugin.name).toBe('@vuepress/plugin-a')
    expect(plugin.shortcut).toBe('@vuepress/a')
    expect(plugin.config).toBe(resolveMockModule('@vuepress/plugin-a'))
  })

  test('shoould return null when plugin cannot be resolved.', () => {
    expect(resolvePlugin('c')).toEqual({ name: 'c', shortcut: 'c', config: null, isLocal: false })
  })
})

describe('hydratePlugin', () => {
  test('shoould hydrate plugin correctly', () => {
    const plugin = { name: 'a', shortcut: 'a', config: { enhanceAppFiles: 'file' }}
    const hydratedPlugin = hydratePlugin(plugin, {}, {})
    expect(hydratedPlugin.name).toBe('a')
    expect(hydratedPlugin.shortcut).toBe('a')
    expect(hydratedPlugin.enabled).toBe(true)
    expect(hydratedPlugin.enhanceAppFiles).toBe('file')
  })

  test('shoould set \'enabled\' to false when \'pluginOptions\' is set to false.', () => {
    const plugin = { name: 'a', shortcut: 'a', config: {}}
    const hydratedPlugin = hydratePlugin(plugin, false, {})
    expect(hydratedPlugin.name).toBe('a')
    expect(hydratedPlugin.shortcut).toBe('a')
    expect(hydratedPlugin.enabled).toBe(false)
  })

  test('shoould hydrate functional plugin correctly.', () => {
    const config = jest.fn(() => ({ enhanceAppFiles: 'file' }))
    const plugin = { name: 'a', shortcut: 'a', config }
    const pluginOptions = {}
    const pluginContext = {}
    const hydratedPlugin = hydratePlugin(plugin, pluginOptions, pluginContext)
    expect(hydratedPlugin.name).toBe('a')
    expect(hydratedPlugin.shortcut).toBe('a')
    expect(hydratedPlugin.enabled).toBe(true)
    expect(hydratedPlugin.enhanceAppFiles).toBe('file')
    expect(config.mock.calls).toHaveLength(1)
    expect(config.mock.calls[0][0]).toBe(pluginOptions)
    expect(Object.getPrototypeOf(config.mock.calls[0][1])).toBe(pluginContext)
  })

  test('shoould hydrate functional plugin correctly - options defaults to \'{}\'.', () => {
    const config = jest.fn(() => ({ enhanceAppFiles: 'file' }))
    const plugin = { name: 'a', shortcut: 'a', config }
    const pluginOptions = undefined
    const pluginContext = {}
    hydratePlugin(plugin, pluginOptions, pluginContext)
    expect(config.mock.calls[0][0]).toEqual({})
    expect(Object.getPrototypeOf(config.mock.calls[0][1])).toBe(pluginContext)
  })
})
