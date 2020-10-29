import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import { pagesData as pagesDataRaw } from '@internal/pagesData'

export type PagesData = typeof pagesDataRaw
export type PagesDataRef = Ref<PagesData>

export const pagesData: PagesDataRef = ref(readonly(pagesDataRaw) as PagesData)

export const usePagesData = (): PagesDataRef => {
  return pagesData
}

if (module.hot) {
  module.hot.accept('@internal/pagesData', () => {
    pagesData.value = readonly(pagesDataRaw) as PagesData
    console.log('[vuepress] pagesData is updated')
  })
}
