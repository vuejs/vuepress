import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageData } from '@internal/pagesData'

export const pageDataSymbol: InjectionKey<ComputedRef<PageData>> = Symbol(
  __DEV__ ? 'pageData' : ''
)

export const usePageData = (): ComputedRef<PageData> => {
  const pageData = inject(pageDataSymbol)
  if (!pageData) {
    throw new Error('usePageData() is called without provider.')
  }
  return pageData
}
