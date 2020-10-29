import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageData, PageFrontmatter } from '@vuepress/shared'

export type { PageFrontmatter }
export type PageFrontmatterRef = ComputedRef<PageFrontmatter>

export const pageFrontmatterSymbol: InjectionKey<PageFrontmatterRef> = Symbol(
  __DEV__ ? 'pageFrontmatter' : ''
)

export const usePageFrontmatter = (): PageFrontmatterRef => {
  const pageFrontmatter = inject(pageFrontmatterSymbol)
  if (!pageFrontmatter) {
    throw new Error('usePageFrontmatter() is called without provider.')
  }
  return pageFrontmatter
}

export const resolvePageFrontmatter = (pageData: PageData): PageFrontmatter =>
  pageData.frontmatter
