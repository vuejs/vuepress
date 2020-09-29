import { normalizePackageName } from '@vuepress/shared'
import { path, requireResolve } from '@vuepress/utils'
import { normalizePlugin } from '../app'
import type { App, ThemeInfo, ThemeObject, ThemeConfig } from '../types'

export const resolveThemeInfo = (app: App, themeName: string): ThemeInfo => {
  const result =
    requireResolve(themeName) ??
    requireResolve(normalizePackageName(themeName, 'vuepress', 'theme'))

  if (result === null) {
    throw new Error()
  }

  const plugin = normalizePlugin<ThemeConfig, ThemeObject>(
    app,
    result,
    app.options.themeConfig
  )

  // TODO: normalize theme path
  // TODO: normalize theme plugin name
  return {
    path: result.match(/.(js|ts)$/) ? path.dirname(result) : result,
    plugin,
  }
}
