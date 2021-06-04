import type { App, ThemeObject } from '../types'
import { resolveThemeLayouts } from './resolveThemeLayouts'
import { resolveThemePlugin } from './resolveThemePlugin'

/**
 * Recursively resolve plugins and layouts of theme and its parent theme
 */
export const resolveTheme = (
  app: App,
  themeName: string
): {
  plugins: ThemeObject[]
  layouts: Record<string, string>
} => {
  const themePlugin = resolveThemePlugin(app, themeName)
  const themeLayouts = resolveThemeLayouts(themePlugin.layouts)

  if (!themePlugin.extends) {
    return {
      plugins: [themePlugin],
      layouts: themeLayouts,
    }
  }

  const parentTheme = resolveTheme(app, themePlugin.extends)

  return {
    plugins: [...parentTheme.plugins, themePlugin],
    layouts: {
      ...parentTheme.layouts,
      ...themeLayouts,
    },
  }
}
