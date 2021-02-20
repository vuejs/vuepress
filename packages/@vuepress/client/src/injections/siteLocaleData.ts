import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { SiteData } from '@vuepress/shared'
import type { RouteLocale } from './routeLocale'

export type SiteLocaleData = SiteData

export type SiteLocaleDataRef = ComputedRef<SiteLocaleData>

export const siteLocaleDataSymbol: InjectionKey<SiteLocaleDataRef> = Symbol(
  __DEV__ ? 'siteLocaleData' : ''
)

export const useSiteLocaleData = (): SiteLocaleDataRef => {
  const siteLocaleData = inject(siteLocaleDataSymbol)
  if (!siteLocaleData) {
    throw new Error('useSiteLocaleData() is called without provider.')
  }
  return siteLocaleData
}

/**
 * Merge the locales fields to the root fields
 * according to the route path
 */
export const resolveSiteLocaleData = (
  site: SiteData,
  routeLocale: RouteLocale
): SiteLocaleData => ({
  ...site,
  ...site.locales[routeLocale],
})
