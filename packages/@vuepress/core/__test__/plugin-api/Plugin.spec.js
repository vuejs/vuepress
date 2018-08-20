jest.mock('vuepress-plugin-a')
jest.mock('@org/vuepress-plugin-a')

const Plugin = require('../../lib/plugin-api/index')
const { PLUGIN_OPTION_MAP } = require('../../lib/plugin-api/constants')

describe('Plugin', () => {
  test('should \'registerOption\' work.', () => {
    const plugin = new Plugin()
    const readyHandler = () => {}
    plugin.registerOption(PLUGIN_OPTION_MAP.READY.key, readyHandler)
    expect(plugin.options.ready.values).toHaveLength(1)
    expect(plugin.options.ready.values[0]).toBe(readyHandler)
  })

  test('should \'useByPluginsConfig\' work.', () => {
    [
      ['a'],
      [['a']],
      [['a', true]],
      { a: true }
    ].forEach(pluginsConfig => {
      const plugin = new Plugin()
      plugin.useByPluginsConfig(pluginsConfig)
      expect(plugin.enabledPlugins).toHaveLength(1)
      expect(plugin.enabledPlugins[0].name).toBe('vuepress-plugin-a')
      expect(plugin.disabledPlugins).toHaveLength(0)
    })
  })

  test('should \'useByPluginsConfig\' work. - disable plugin', () => {
    [
      [['a', false]],
      { a: false }
    ].forEach(pluginsConfig => {
      const plugin = new Plugin()
      plugin.useByPluginsConfig(pluginsConfig)
      expect(plugin.enabledPlugins).toHaveLength(0)
      expect(plugin.disabledPlugins).toHaveLength(1)
      expect(plugin.disabledPlugins[0].name).toBe('vuepress-plugin-a')
    })
  })

  test('should \'useByPluginsConfig\' work. - get options', () => {
    const pluginOptions = {};
    [
      [['a', pluginOptions]],
      { a: pluginOptions }
    ].forEach(pluginsConfig => {
      const plugin = new Plugin()
      plugin.useByPluginsConfig(pluginsConfig)
      expect(plugin.enabledPlugins[0].$$options).toBe(pluginOptions)
    })
  })

  test('make sure the namesake plugin is only executed once.', () => {
    const pluginOptions1 = {}
    const pluginOptions2 = {}
    const pluginOptions3 = {}
    const pluginsConfig = [
      ['a', pluginOptions1],
      ['a', pluginOptions2],
      ['a', pluginOptions3]
    ]
    const plugin = new Plugin()
    plugin.useByPluginsConfig(pluginsConfig)
    expect(plugin.enabledPlugins).toHaveLength(1)
    // using the last one
    expect(plugin.enabledPlugins[0].$$options).toBe(pluginOptions3)
  })
})
