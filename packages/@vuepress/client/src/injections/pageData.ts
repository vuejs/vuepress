import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageData } from '@vuepress/shared'
import type { PagesData } from './pagesData'

export type { PageData }
export type PageDataRef = ComputedRef<PageData>

export const pageDataSymbol: InjectionKey<PageDataRef> = Symbol(
  __DEV__ ? 'pageData' : ''
)

export const usePageData = (): PageDataRef => {
  const pageData = inject(pageDataSymbol)
  if (!pageData) {
    throw new Error('usePageData() is called without provider.')
  }
  return pageData
}

export const resolvePageData = (
  pagesData: PagesData,
  routePath: string
): PageData =>
  pagesData[routePath] ?? {
    key: '',
    path: '',
    title: '',
    frontmatter: {},
    excerpt: '',
    headers: [],
  }
