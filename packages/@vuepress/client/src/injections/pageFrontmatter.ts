import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageData, PageFrontmatter } from '@vuepress/shared'

export type { PageFrontmatter }
export type PageFrontmatterRef<
  T extends Record<any, any> = Record<string, unknown>
> = ComputedRef<PageFrontmatter<T>>

export const pageFrontmatterSymbol: InjectionKey<PageFrontmatterRef> = Symbol(
  __DEV__ ? 'pageFrontmatter' : ''
)

export const usePageFrontmatter = <
  T extends Record<any, any> = Record<string, unknown>
>(): PageFrontmatterRef<T> => {
  const pageFrontmatter = inject(pageFrontmatterSymbol)
  if (!pageFrontmatter) {
    throw new Error('usePageFrontmatter() is called without provider.')
  }
  return pageFrontmatter as PageFrontmatterRef<T>
}

export const resolvePageFrontmatter = (pageData: PageData): PageFrontmatter =>
  pageData.frontmatter
