import { normalizePackageName } from '@vuepress/shared'
import { path, requireResolve } from '@vuepress/utils'
import { normalizePlugin } from '../app'
import type { App, ThemeInfo, ThemeObject, ThemeConfig } from '../types'
import { resolveThemeLayouts } from './resolveThemeLayouts'

export const resolveThemeInfo = (app: App, themeName: string): ThemeInfo => {
  // resolve theme entry according to theme name
  const themeEntry =
    requireResolve(themeName) ??
    requireResolve(normalizePackageName(themeName, 'vuepress', 'theme'))

  if (themeEntry === null) {
    throw new Error(`theme ${themeName} is not found`)
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

  // TODO: normalize theme path
  // TODO: normalize theme plugin name
  return {
    plugin: themePlugin,
    layouts,
  }
}
