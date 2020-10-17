import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import { siteData as siteDataRaw } from '@internal/siteData'
import type { SiteData as SiteDataRaw } from '@internal/siteData'

export type SiteData = Ref<SiteDataRaw>

export const siteData: SiteData = ref(readonly(siteDataRaw) as SiteDataRaw)

export const useSiteData = (): SiteData => {
  return siteData
}

// TODO: HMR
if (module.hot) {
  module.hot.accept('@internal/siteData', () => {
    console.log('Accepting the updated siteData module!')
    siteData.value = readonly(siteDataRaw) as SiteDataRaw
  })
}
