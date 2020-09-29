import { createThemeApi } from '../theme-api'
import type { App } from '../types'
import { createAppWriteTemp } from './createAppWriteTemp'

/**
 * Initialize a vuepress app
 *
 * Plugins should be used before initialization.
 */
export const appInit = async (app: App): Promise<void> => {
  // create write temp util
  app.writeTemp = await createAppWriteTemp(app)

  // create theme api, resolve themes and layouts
  app.themeApi = await createThemeApi(app)

  // TODO: use theme-api plugin

  // use user plugins
  app.options.plugins.forEach((item) => app.useByConfig(item))

  // use theme plugin
  if (app.themeApi.parentTheme) {
    app.use(app.themeApi.parentTheme.plugin)
  }
  app.use(app.themeApi.theme.plugin)

  // register all hooks of plugins that have been used
  // plugins should be used before `registerHooks()`
  // hooks in plugins will take effect after `registerHooks()`
  app.pluginApi.registerHooks()

  // plugin hook: extendMarkdown
  await app.pluginApi.hooks.extendMarkdown.process(app.markdown)

  // plugin hook: onInitialized
  await app.pluginApi.hooks.onInitialized.process(app)
}
