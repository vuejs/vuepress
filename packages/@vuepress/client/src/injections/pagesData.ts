import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import { pagesData as pagesDataRaw } from '@internal/pagesData'
import type { PagesData as PagesDataRaw } from '@internal/pagesData'

export type PagesData = Ref<PagesDataRaw>

export const pagesData: PagesData = ref(readonly(pagesDataRaw) as PagesDataRaw)

export const usePagesData = (): PagesData => {
  return pagesData
}

// TODO: HMR
if (module.hot) {
  module.hot.accept('@internal/pagesData', () => {
    console.log('Accepting the updated pagesData module!')
    pagesData.value = readonly(pagesDataRaw) as PagesDataRaw
  })
}
