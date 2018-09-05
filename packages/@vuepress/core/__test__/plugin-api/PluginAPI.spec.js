jest.mock('vuepress-plugin-a')
jest.mock('vuepress-plugin-b')
jest.mock('@org/vuepress-plugin-a')

import PluginAPI from '../../lib/plugin-api/index'
import { PLUGIN_OPTION_MAP } from '../../lib/plugin-api/constants'

describe('Plugin', () => {
  test('should \'registerOption\' work.', () => {
    const api = new PluginAPI()
    const readyHandler = () => {}
    api.registerOption(PLUGIN_OPTION_MAP.READY.key, readyHandler)
    expect(api.options.ready.values).toHaveLength(1)
    expect(api.options.ready.values[0]).toBe(readyHandler)
  })

  test('should \'useByPluginsConfig\' work.', () => {
    [
      ['a'],
      [['a']],
      [['a', true]],
      { a: true }
    ].forEach(pluginsConfig => {
      const api = new PluginAPI()
      api.useByPluginsConfig(pluginsConfig)
      expect(api.enabledPlugins).toHaveLength(1)
      expect(api.enabledPlugins[0].name).toBe('vuepress-plugin-a')
      expect(api.disabledPlugins).toHaveLength(0)
    })
  })

  test('should \'useByPluginsConfig\' work. - disable plugin', () => {
    [
      [['a', false]],
      { a: false }
    ].forEach(pluginsConfig => {
      const api = new PluginAPI()
      api.useByPluginsConfig(pluginsConfig)
      expect(api.enabledPlugins).toHaveLength(0)
      expect(api.disabledPlugins).toHaveLength(1)
      expect(api.disabledPlugins[0].name).toBe('vuepress-plugin-a')
    })
  })

  test('should \'useByPluginsConfig\' work. - get options', () => {
    const pluginOptions = {};
    [
      [['a', pluginOptions]],
      { a: pluginOptions }
    ].forEach(pluginsConfig => {
      const api = new PluginAPI()
      api.useByPluginsConfig(pluginsConfig)
      expect(api.enabledPlugins[0].$$options).toBe(pluginOptions)
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
    const api = new PluginAPI()
    api.useByPluginsConfig(pluginsConfig)
    expect(api.enabledPlugins).toHaveLength(1)
    // using the last one
    expect(api.enabledPlugins[0].$$options).toBe(pluginOptions3)
  })

  test('a "multuple" plugin can be applied multuple times.', () => {
    const pluginOptions1 = { a: 1 }
    const pluginOptions2 = { b: 1 }
    const pluginsConfig = [
      ['b', pluginOptions1],
      ['b', pluginOptions2]
    ]
    const api = new PluginAPI()
    api.useByPluginsConfig(pluginsConfig)
    expect(api.enabledPlugins).toHaveLength(2)
    // using the last one
    expect(api.enabledPlugins[0].$$options).toBe(pluginOptions1)
    expect(api.enabledPlugins[1].$$options).toBe(pluginOptions2)
  })
})
