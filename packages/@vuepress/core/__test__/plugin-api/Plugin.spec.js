jest.mock('vuepress-plugin-a')
jest.mock('@org/vuepress-plugin-a')

const Plugin = require('../../lib/plugin-api/index')
const { PLUGIN_OPTION_MAP } = require('../../lib/plugin-api/constants')

describe('Plugin', () => {
  test('should resolve scope packages correctly.', () => {
    const plugin = new Plugin()
    const readyHandler = () => {}
    plugin.registerOption(PLUGIN_OPTION_MAP.READY.key, readyHandler)
    expect(plugin.options.ready.values).toHaveLength(1)
    expect(plugin.options.ready.values[0]).toBe(readyHandler)
  })
})
