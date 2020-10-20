import type { LocaleConfig } from '../types'

/**
 * Resolve the matched locale path of route path
 */
export const resolveLocalePath = (
  locales: LocaleConfig,
  routePath: string
): string => {
  const localePaths = Object.keys(locales).sort((a, b) => {
    const levelDelta = b.split('/').length - a.split('/').length
    if (levelDelta !== 0) {
      return levelDelta
    }
    return b.length - a.length
  })

  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return localePath
    }
  }

  return '/'
}
