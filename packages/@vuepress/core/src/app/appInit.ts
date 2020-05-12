import {
  layoutComponentsPlugin,
  pageComponentsPlugin,
  routesPlugin,
  siteDataPlugin,
} from '../plugins'
import { createThemeApi } from '../theme-api'
import { App } from './createApp'
import { createAppMarkdown } from './createAppMarkdown'
import { createAppWriteTemp } from './createAppWriteTemp'

export const appInit = async (app: App): Promise<void> => {
  // create write temp util
  app.writeTemp = await createAppWriteTemp(app)

  // create theme api, resolve themes and layouts
  app.themeApi = createThemeApi(app)

  // use internal plugins
  const internalPlugins = [
    layoutComponentsPlugin,
    pageComponentsPlugin,
    routesPlugin,
    siteDataPlugin,
    // TODO: use theme-api plugin
  ]
  internalPlugins.forEach((item) => app.use(item))

  // use user plugins
  app.options.plugins.forEach((item) => app.useByConfig(item))

  // use theme plugin
  if (app.themeApi.parentTheme) {
    app.use(app.themeApi.parentTheme.plugin)
  }
  app.use(app.themeApi.theme.plugin)

  // register all options of plugins that have been used
  app.pluginApi.registerOptions()

  // create markdown
  app.markdown = createAppMarkdown(app)

  // apply plugin option: onInitialized
  await app.pluginApi.applyOption('onInitialized', app)
}
