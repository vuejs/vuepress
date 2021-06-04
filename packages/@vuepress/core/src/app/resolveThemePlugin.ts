import { normalizePackageName } from '@vuepress/shared'
import { chalk, logger, path, requireResolve } from '@vuepress/utils'
import { normalizePlugin } from '../app'
import type { App, ThemeObject, ThemeConfig } from '../types'

/**
 * Resolve theme plugin according to theme name
 */
export const resolveThemePlugin = (
  app: App,
  themeName: string
): ThemeObject => {
  // resolve theme entry according to theme name
  const themeEntry = requireResolve(
    path.isAbsolute(themeName)
      ? themeName
      : normalizePackageName(themeName, 'vuepress', 'theme')
  )

  if (themeEntry === null) {
    throw logger.createError(`theme is not found: ${chalk.magenta(themeName)}`)
  }

  // normalize theme plugin from theme entry
  const themePlugin = normalizePlugin<ThemeConfig, ThemeObject>(
    app,
    themeEntry,
    app.options.themeConfig
  )

  return themePlugin
}
