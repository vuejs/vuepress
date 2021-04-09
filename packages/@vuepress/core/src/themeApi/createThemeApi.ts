import type { App, ThemeApi } from '../types'
import { resolveThemeInfo } from './resolveThemeInfo'

/**
 * Create vuepress theme-api
 *
 * Resolve current theme, parent theme, theme layouts
 */
export const createThemeApi = (app: App): ThemeApi => {
  // resolve theme info
  const theme = resolveThemeInfo(app, app.options.theme)

  // resolve parent theme info
  const parentTheme = theme.plugin.extends
    ? resolveThemeInfo(app, theme.plugin.extends)
    : null

  // resolve theme layouts
  const layouts = theme.layouts

  // layouts in child theme will override
  // those with the same name in parent theme
  if (parentTheme !== null) {
    layouts.unshift(
      ...parentTheme.layouts.filter(
        ({ name: parentLayoutName }) =>
          !theme.layouts.some(
            ({ name: childLayoutName }) => childLayoutName === parentLayoutName
          )
      )
    )
  }

  return {
    theme,
    parentTheme,
    layouts,
  }
}
