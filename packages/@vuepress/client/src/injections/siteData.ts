import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import type { SiteData, SiteThemeConfig } from '@vuepress/shared'
import { siteData as siteDataRaw } from '@internal/siteData'

export type { SiteData }
export type SiteDataRef<T extends SiteThemeConfig = SiteThemeConfig> = Ref<
  SiteData<T>
>

export const siteData: SiteDataRef = ref(readonly(siteDataRaw) as SiteData)

export const useSiteData = <
  T extends SiteThemeConfig = SiteThemeConfig
>(): SiteDataRef<T> => {
  return siteData as SiteDataRef<T>
}

if (module.hot) {
  module.hot.accept('@internal/siteData', () => {
    siteData.value = readonly(siteDataRaw) as SiteData
    console.log('[vuepress] siteData is updated')
  })
}
