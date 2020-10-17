import type { SiteData } from '../types'
import { resolveLocaleConfigItem } from './resolveLocaleConfigItem'

/**
 * Merge the locales fields to the root fields
 * according to the route path
 */
export const resolveSiteLocaleData = (
  { base, lang, title, description, head, locales, themeConfig }: SiteData,
  routePath: string
): SiteData => {
  return {
    base,
    lang,
    title,
    description,
    head,
    locales,
    ...resolveLocaleConfigItem(locales, routePath),
    themeConfig: {
      ...themeConfig,
      ...resolveLocaleConfigItem(themeConfig.locales ?? {}, routePath),
    },
  }
}
