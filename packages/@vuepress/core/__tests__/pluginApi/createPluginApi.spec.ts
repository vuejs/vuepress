import { createBaseApp, createPluginApi } from '@vuepress/core'
import type { HooksName } from '@vuepress/core'
import { path } from '@vuepress/utils'

const app = createBaseApp({
  source: path.resolve(__dirname, 'fake-source'),
  theme: path.resolve(__dirname, '../__fixtures__/themes/empty.js'),
})

describe('core > pluginApi > createPluginApi', () => {
  it('should have correct hooks', () => {
    const hookNames: HooksName[] = [
      'onInitialized',
      'onPrepared',
      'onWatched',
      'onGenerated',
      'extendsMarkdown',
      'extendsPageOptions',
      'extendsPageData',
      'clientAppEnhanceFiles',
      'clientAppRootComponentFiles',
      'clientAppSetupFiles',
      'alias',
      'define',
    ]

    const pluginApi = createPluginApi()

    hookNames.forEach((hookName) => {
      expect(pluginApi.hooks).toHaveProperty(hookName)
    })
  })

  it('hooks should only take effect after `registerHooks` is called', async () => {
    const pluginApi = createPluginApi()

    const hookFn = jest.fn()

    pluginApi.plugins.push({
      name: 'test',
      onInitialized: hookFn,
    })

    // before `registerHooks`
    await pluginApi.hooks.onInitialized.process(app)

    expect(hookFn).toHaveBeenCalledTimes(0)

    // after `registerHooks`
    pluginApi.registerHooks()
    await pluginApi.hooks.onInitialized.process(app)

    expect(hookFn).toHaveBeenCalledTimes(1)
    expect(hookFn).toHaveBeenCalledWith(app)
  })
})
