import { fs } from '@vuepress/utils'
import type { App, ThemeApi } from '../types'
import { resolveThemeInfo } from './resolveThemeInfo'
import { resolveThemeLayouts } from './resolveThemeLayouts'

/**
 * Create vuepress theme-api
 *
 * Resolve current theme, parent theme, theme layouts
 */
export const createThemeApi = async (app: App): Promise<ThemeApi> => {
  // use local theme or not
  const localThemePath = app.dir.source('.vuepress/theme')
  const hasLocalTheme = await fs.pathExists(localThemePath)

  const theme = resolveThemeInfo(
    app,
    hasLocalTheme ? localThemePath : app.options.theme
  )

  const parentTheme = theme.plugin.extends
    ? resolveThemeInfo(app, theme.plugin.extends)
    : null

  const layouts = [
    ...(parentTheme ? resolveThemeLayouts(parentTheme) : []),
    // TODO: parent theme and current theme may have layouts of same name
    ...resolveThemeLayouts(theme),
  ]

  return {
    theme,
    parentTheme,
    layouts,
  }
}
