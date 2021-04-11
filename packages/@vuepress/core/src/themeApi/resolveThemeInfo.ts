import { normalizePackageName } from '@vuepress/shared'
import { chalk, logger, path, requireResolve } from '@vuepress/utils'
import { normalizePlugin } from '../app'
import type { App, ThemeInfo, ThemeObject, ThemeConfig } from '../types'
import { resolveThemeLayouts } from './resolveThemeLayouts'

export const resolveThemeInfo = (app: App, themeName: string): ThemeInfo => {
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

  // get theme path
  const themePath = themeEntry.match(/.(js|ts)$/)
    ? path.dirname(themeEntry)
    : themeEntry

  // resolve theme layouts
  const layouts = resolveThemeLayouts({
    themePath,
    themePlugin,
  })

  return {
    plugin: themePlugin,
    layouts,
  }
}
