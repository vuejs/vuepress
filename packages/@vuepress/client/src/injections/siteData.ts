import { readonly, ref } from 'vue'
import type { Ref, DeepReadonly } from 'vue'
import { siteData as siteDataRaw } from '@internal/siteData'
import type { SiteData as SiteDataRaw } from '@internal/siteData'

export type SiteData = Ref<DeepReadonly<SiteDataRaw>>

export const siteData: SiteData = ref(readonly(siteDataRaw))

export const useSiteData = (): SiteData => {
  return siteData
}

// TODO: HMR
if (module.hot) {
  module.hot.accept('@internal/siteData', () => {
    console.log('Accepting the updated siteData module!')
    siteData.value = readonly(siteDataRaw)
  })
}
