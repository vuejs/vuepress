import type { LocaleConfig, LocaleConfigItem } from '../types'
import { resolveLocalePath } from './resolveLocalePath'

/**
 * Resolve the matched locale config item of route path
 */
export const resolveLocaleConfigItem = (
  locales: LocaleConfig,
  routePath: string
): LocaleConfigItem => {
  const localePath = resolveLocalePath(locales, routePath)
  return locales[localePath] ?? {}
}
