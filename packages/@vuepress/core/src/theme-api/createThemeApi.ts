import { fs } from '@vuepress/utils'
import { App } from '../app'
import { ThemeInfo, resolveThemeInfo } from './resolveThemeInfo'
import { ThemeLayout, resolveThemeLayouts } from './resolveThemeLayouts'

export interface ThemeApi {
  /**
   * Current theme
   */
  theme: ThemeInfo

  /**
   * Parent theme
   */
  parentTheme: ThemeInfo | null

  /**
   * Layouts
   */
  layouts: ThemeLayout[]
}

export const createThemeApi = (app: App): ThemeApi => {
  // use local theme or not
  const localThemePath = app.dir.source('.vuepress/theme')
  const hasLocalTheme = fs.existsSync(localThemePath)

  const theme = resolveThemeInfo(
    app,
    hasLocalTheme ? localThemePath : app.options.theme
  )

  const parentTheme = theme.plugin.extend
    ? resolveThemeInfo(app, theme.plugin.extend)
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
