import { flattenPlugin } from '../../plugin-api/util'

describe('flattenPlugin', () => {
  test('should hydrate plugin correctly', () => {
    const plugin = { name: 'a', shortcut: 'a', entry: { enhanceAppFiles: 'file' }}
    const hydratedPlugin = flattenPlugin(plugin, {}, {})
    expect(hydratedPlugin.name).toBe('a')
    expect(hydratedPlugin.shortcut).toBe(null)
    expect(hydratedPlugin.enabled).toBe(true)
    expect(hydratedPlugin.enhanceAppFiles).toBe('file')
  })

  test('should set \'enabled\' to false when \'pluginOptions\' is set to false.', () => {
    const plugin = { name: 'a', shortcut: 'a', entry: {}}
    const hydratedPlugin = flattenPlugin(plugin, false, {})
    expect(hydratedPlugin.name).toBe('a')
    expect(hydratedPlugin.shortcut).toBe(null)
    expect(hydratedPlugin.enabled).toBe(false)
  })

  test('should flatten functional plugin correctly.', () => {
    const config = jest.fn(() => ({ enhanceAppFiles: 'file' }))
    const plugin = { name: 'a', shortcut: 'a', entry: config }
    const pluginOptions = {}
    const pluginContext = {}
    const hydratedPlugin = flattenPlugin(plugin, pluginOptions, pluginContext)
    expect(hydratedPlugin.name).toBe('a')
    expect(hydratedPlugin.shortcut).toBe(null)
    expect(hydratedPlugin.enabled).toBe(true)
    expect(hydratedPlugin.enhanceAppFiles).toBe('file')
    expect(config.mock.calls).toHaveLength(1)
    expect(config.mock.calls[0][0]).toBe(pluginOptions)
    expect(Object.getPrototypeOf(config.mock.calls[0][1])).toBe(pluginContext)
  })

  test('should flatten functional plugin correctly - options defaults to \'{}\'.', () => {
    const config = jest.fn(() => ({ enhanceAppFiles: 'file' }))
    const plugin = { name: 'a', shortcut: 'a', entry: config }
    const pluginOptions = undefined
    const pluginContext = {}
    flattenPlugin(plugin, pluginOptions, pluginContext)
    expect(config.mock.calls[0][0]).toEqual({})
    expect(Object.getPrototypeOf(config.mock.calls[0][1])).toBe(pluginContext)
  })
})
