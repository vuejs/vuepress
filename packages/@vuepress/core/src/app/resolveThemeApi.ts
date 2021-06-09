import type { App, PluginObject } from '../types'
import { resolvePluginsFromConfig } from './resolvePluginsFromConfig'
import { resolveTheme } from './resolveTheme'
import { resolveThemeLayouts } from './resolveThemeLayouts'

/**
 * Recursively resolve plugins and layouts of theme and its parent theme
 */
export const resolveThemeApi = (
  app: App,
  themeName: string
): {
  layouts: Record<string, string>
  plugins: PluginObject[]
} => {
  const theme = resolveTheme(app, themeName)
  const themeLayouts = resolveThemeLayouts(theme.layouts)
  const themePlugins = resolvePluginsFromConfig(app, theme.plugins)

  if (!theme.extends) {
    return {
      layouts: themeLayouts,
      plugins: [theme, ...themePlugins],
    }
  }

  const parentThemeApi = resolveThemeApi(app, theme.extends)

  return {
    layouts: {
      ...parentThemeApi.layouts,
      ...themeLayouts,
    },
    plugins: [...parentThemeApi.plugins, theme, ...themePlugins],
  }
}
