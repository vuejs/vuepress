import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { isString } from '@vuepress/shared'
import type { PageFrontmatter } from './pageFrontmatter'
import type { SiteLocaleData } from './siteLocaleData'

export type PageLang = string
export type PageLangRef = ComputedRef<PageLang>

export const pageLangSymbol: InjectionKey<PageLangRef> = Symbol(
  __DEV__ ? 'pageLang' : ''
)

export const usePageLang = (): PageLangRef => {
  const pageLang = inject(pageLangSymbol)
  if (!pageLang) {
    throw new Error('usePageLang() is called without provider.')
  }
  return pageLang
}

export const resolvePageLang = (
  frontmatter: PageFrontmatter,
  siteLocale: SiteLocaleData
): PageLang => {
  if (isString(frontmatter.lang) && frontmatter.lang) {
    return frontmatter.lang
  }
  return siteLocale.lang || 'en'
}
