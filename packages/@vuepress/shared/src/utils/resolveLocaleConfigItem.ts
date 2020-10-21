import type { LocaleConfig, LocaleConfigItem } from '../types'
import { resolveLocalePath } from './resolveLocalePath'

/**
 * Resolve the matched locale config item of route path
 */
export const resolveLocaleConfigItem = <T extends Record<string, any>>(
  locales: LocaleConfig<T>,
  routePath: string
): LocaleConfigItem<T> => {
  const localePath = resolveLocalePath(locales, routePath)
  return locales[localePath] ?? {}
}
