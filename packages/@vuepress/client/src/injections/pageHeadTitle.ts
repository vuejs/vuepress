import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageData } from './pageData'
import type { SiteLocaleData } from './siteLocaleData'

export type PageHeadTitle = string
export type PageHeadTitleRef = ComputedRef<PageHeadTitle>

export const pageHeadTitleSymbol: InjectionKey<PageHeadTitleRef> = Symbol(
  __DEV__ ? 'pageHeadTitle' : ''
)

export const usePageHeadTitle = (): PageHeadTitleRef => {
  const pageHeadTitle = inject(pageHeadTitleSymbol)
  if (!pageHeadTitle) {
    throw new Error('usePageHeadTitle() is called without provider.')
  }
  return pageHeadTitle
}

/**
 * Title to displayed in `<head>` tag
 */
export const resolvePageHeadTitle = (
  page: PageData,
  siteLocale: SiteLocaleData
): PageHeadTitle => `${page.title ? `${page.title} | ` : ``}${siteLocale.title}`
