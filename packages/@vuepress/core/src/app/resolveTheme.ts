import { normalizePackageName } from '@vuepress/shared'
import { chalk, logger, path, requireResolve } from '@vuepress/utils'
import type { App, ThemeObject, ThemeConfig } from '../types'
import { resolvePlugin } from './resolvePlugin'

/**
 * Resolve a theme according to the theme name
 */
export const resolveTheme = (app: App, themeName: string): ThemeObject => {
  // resolve theme entry according to theme name
  const themeEntry = requireResolve(
    path.isAbsolute(themeName)
      ? themeName
      : normalizePackageName(themeName, 'vuepress', 'theme')
  )

  if (themeEntry === null) {
    throw logger.createError(`theme is not found: ${chalk.magenta(themeName)}`)
  }

  // resolve theme from theme entry
  const theme = resolvePlugin<ThemeConfig, ThemeObject>(
    app,
    themeEntry,
    app.options.themeConfig
  )

  return theme
}
