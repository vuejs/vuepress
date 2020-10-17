import type { LocaleConfig, LocaleConfigItem } from '../types'

/**
 * Resolve the matched locale config item of route path
 */
export const resolveLocaleConfigItem = (
  locales: LocaleConfig,
  routePath: string
): LocaleConfigItem => {
  const localePaths = Object.keys(locales).sort((a, b) => {
    const levelDelta = b.split('/').length - a.split('/').length
    if (levelDelta !== 0) {
      return levelDelta
    }
    return b.length - a.length
  })

  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return locales[localePath]
    }
  }

  return {}
}
