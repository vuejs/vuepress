import { basename } from 'path'
import { moduleResolver } from '@vuepress/shared-utils'
import { App, ThemeOptions, normalizePlugin } from '../app'

// TODO: migrate module resolver
const cwd = process.cwd()
const resolver = moduleResolver.getThemeResolver(cwd)

export interface ThemeInfo {
  /**
   * Path of theme
   */
  path: string

  /**
   * Plugin options of theme
   */
  plugin: ThemeOptions
}

export const resolveThemeInfo = (app: App, themeName: string): ThemeInfo => {
  // TODO: for current theme resolver, the `entry` is the path string
  const result = resolver.resolve(themeName, cwd)

  if (!result.entry) {
    throw new Error()
  }

  const plugin = normalizePlugin(
    app,
    require(result.entry),
    app.options.themeConfig
  )

  // TODO: normalize theme path
  // TODO: normalize theme plugin name
  return {
    path: result.entry.match(/.(js|ts)$/)
      ? basename(result.entry)
      : result.entry,
    plugin,
  }
}
