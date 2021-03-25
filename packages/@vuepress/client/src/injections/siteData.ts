import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import type { SiteData } from '@vuepress/shared'
import { siteData as siteDataRaw } from '@internal/siteData'

export type { SiteData }
export type SiteDataRef = Ref<SiteData>

export const siteData: SiteDataRef = ref(readonly(siteDataRaw) as SiteData)

export const useSiteData = (): SiteDataRef => siteData

if (import.meta.webpackHot || import.meta.hot) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updateSiteData = (data: SiteData) => {
    siteData.value = readonly(data) as SiteData
  }
}
