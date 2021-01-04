import { debug } from '@vuepress/utils'
import { createThemeApi } from '../themeApi'
import type { App } from '../types'
import { createAppPages } from './createAppPages'
import { createAppWriteTemp } from './createAppWriteTemp'

const log = debug('vuepress:core/app')

/**
 * Initialize a vuepress app
 *
 * Plugins should be used before initialization.
 */
export const appInit = async (app: App): Promise<void> => {
  log('init start')

  // create write temp util
  app.writeTemp = await createAppWriteTemp(app)

  // create theme api, resolve themes and layouts
  app.themeApi = await createThemeApi(app)

  // use theme plugin
  if (app.themeApi.parentTheme) {
    app.use(app.themeApi.parentTheme.plugin)
  }
  app.use(app.themeApi.theme.plugin)

  // register all hooks of plugins that have been used
  // plugins should be used before `registerHooks()`
  // hooks in plugins will take effect after `registerHooks()`
  app.pluginApi.registerHooks()

  // plugin hook: extendsMarkdown
  await app.pluginApi.hooks.extendsMarkdown.process(app.markdown, app)

  // create pages
  app.pages = await createAppPages(app)

  // plugin hook: onInitialized
  await app.pluginApi.hooks.onInitialized.process(app)

  log('init finish')
}
