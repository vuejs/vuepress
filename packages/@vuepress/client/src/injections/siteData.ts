import { inject, InjectionKey } from 'vue'
import { SiteData } from '@internal/siteData'

export const siteDataKey: InjectionKey<SiteData> = Symbol('siteData')

export const useSiteData = (): SiteData => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return inject(siteDataKey)!
}
