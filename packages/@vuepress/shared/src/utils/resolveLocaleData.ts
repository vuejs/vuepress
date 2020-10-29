import type { LocaleConfig, LocaleData } from '../types'
import { resolveLocalePath } from './resolveLocalePath'

/**
 * Resolve the matched locale data of route path
 */
export const resolveLocaleData = <T extends LocaleData>(
  locales: LocaleConfig<T>,
  routePath: string
): Partial<T> => {
  const localePath = resolveLocalePath(locales, routePath)
  return locales[localePath] ?? {}
}
