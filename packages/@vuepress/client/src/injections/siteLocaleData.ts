import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { SiteData } from '@internal/siteData'

export const siteLocaleDataSymbol: InjectionKey<ComputedRef<SiteData>> = Symbol(
  __DEV__ ? 'siteLocaleData' : ''
)

export const useSiteLocaleData = (): ComputedRef<SiteData> => {
  const siteLocaleData = inject(siteLocaleDataSymbol)
  if (!siteLocaleData) {
    throw new Error('useSiteLocaleData() is called without provider.')
  }
  return siteLocaleData
}
