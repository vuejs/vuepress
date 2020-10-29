import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import type { SiteData } from '@vuepress/shared'
import { siteData as siteDataRaw } from '@internal/siteData'

export type { SiteData }
export type SiteDataRef = Ref<SiteData>

export const siteData: SiteDataRef = ref(readonly(siteDataRaw) as SiteData)

export const useSiteData = (): SiteDataRef => {
  return siteData
}

if (module.hot) {
  module.hot.accept('@internal/siteData', () => {
    siteData.value = readonly(siteDataRaw) as SiteData
    console.log('[vuepress] siteData is updated')
  })
}
