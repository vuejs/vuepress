import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import type { PageData } from '@vuepress/shared'
import { pagesData as pagesDataRaw } from '@internal/pagesData'

export type PagesData = Record<string, () => Promise<PageData>>
export type PagesDataRef = Ref<PagesData>

export const pagesData: PagesDataRef = ref(readonly(pagesDataRaw) as PagesData)

export const usePagesData = (): PagesDataRef => {
  return pagesData
}

if (import.meta.webpackHot) {
  import.meta.webpackHot!.accept('@internal/pagesData', () => {
    pagesData.value = readonly(pagesDataRaw) as PagesData
    console.log('[vuepress] pagesData is updated')
  })
}
