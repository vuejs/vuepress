import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { SiteData, SiteThemeConfig } from '@vuepress/shared'
import type { RouteLocale } from './routeLocale'

export type SiteLocaleData<
  T extends SiteThemeConfig = SiteThemeConfig
> = SiteData<T>

export type SiteLocaleDataRef<
  T extends SiteThemeConfig = SiteThemeConfig
> = ComputedRef<SiteLocaleData<T>>

export const siteLocaleDataSymbol: InjectionKey<SiteLocaleDataRef> = Symbol(
  __DEV__ ? 'siteLocaleData' : ''
)

export const useSiteLocaleData = <
  T extends SiteThemeConfig = SiteThemeConfig
>(): SiteLocaleDataRef<T> => {
  const siteLocaleData = inject(siteLocaleDataSymbol)
  if (!siteLocaleData) {
    throw new Error('useSiteLocaleData() is called without provider.')
  }
  return siteLocaleData as SiteLocaleDataRef<T>
}

/**
 * Merge the locales fields to the root fields
 * according to the route path
 */
export const resolveSiteLocaleData = <T extends SiteThemeConfig>(
  { base, lang, title, description, head, locales, themeConfig }: SiteData<T>,
  routeLocale: RouteLocale
): SiteLocaleData<T> => ({
  base,
  lang,
  title,
  description,
  head,
  locales,
  ...(locales[routeLocale] ?? {}),
  themeConfig: {
    ...themeConfig,
    ...(themeConfig.locales?.[routeLocale] ?? {}),
  },
})
