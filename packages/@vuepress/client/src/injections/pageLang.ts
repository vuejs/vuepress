import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { PageData } from '@vuepress/shared'

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

/**
 * Resolve language of current page
 *
 * It's mainly used for the `lang` attribute of `<html>` tag,
 * which should not be empty
 */
export const resolvePageLang = (pageData: PageData): PageLang =>
  pageData.lang || 'en'
