import { ref } from 'vue'
import type { Ref } from 'vue'
import type { PageData } from '@vuepress/shared'
import { pagesData as pagesDataRaw } from '@internal/pagesData'

export type PagesData = Record<string, () => Promise<PageData>>
export type PagesDataRef = Ref<PagesData>

export const pagesData: PagesDataRef = ref(pagesDataRaw)

export const usePagesData = (): PagesDataRef => {
  return pagesData
}
