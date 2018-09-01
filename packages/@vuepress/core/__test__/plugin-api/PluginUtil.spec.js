import { hydratePlugin } from '../../lib/plugin-api/util'

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
