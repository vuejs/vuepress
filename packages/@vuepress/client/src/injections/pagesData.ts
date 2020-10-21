import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import { pagesData as pagesDataRaw } from '@internal/pagesData'
import type { PagesData as PagesDataRaw } from '@internal/pagesData'

export type PagesData = Ref<PagesDataRaw>

export const pagesData: PagesData = ref(readonly(pagesDataRaw) as PagesDataRaw)

export const usePagesData = (): PagesData => {
  return pagesData
}

if (module.hot) {
  module.hot.accept('@internal/pagesData', () => {
    pagesData.value = readonly(pagesDataRaw) as PagesDataRaw
    console.log('pagesData is updated')
  })
}
