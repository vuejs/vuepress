import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { dedupeHead, isArray, isString } from '@vuepress/shared'
import type { HeadConfig } from '@vuepress/shared'
import type { PageFrontmatter } from './pageFrontmatter'
import type { PageHeadTitle } from './pageHeadTitle'
import type { SiteLocaleData } from './siteLocaleData'

export type PageHead = HeadConfig[]
export type PageHeadRef = ComputedRef<PageHead>

export const pageHeadSymbol: InjectionKey<PageHeadRef> = Symbol(
  __DEV__ ? 'pageHead' : ''
)

export const usePageHead = (): PageHeadRef => {
  const pageHead = inject(pageHeadSymbol)
  if (!pageHead) {
    throw new Error('usePageHead() is called without provider.')
  }
  return pageHead
}

/**
 * Merge the head config in frontmatter and site locale
 *
 * Frontmatter should take priority over site locale
 */
export const resolvePageHead = (
  headTitle: PageHeadTitle,
  frontmatter: PageFrontmatter,
  siteLocale: SiteLocaleData
): HeadConfig[] => {
  const description = isString(frontmatter.description)
    ? frontmatter.description
    : siteLocale.description

  const head: HeadConfig[] = [
    ...(isArray(frontmatter.head) ? frontmatter.head : []),
    ...siteLocale.head,
    ['title', {}, headTitle],
    ['meta', { name: 'description', content: description }],
    ['meta', { charset: 'utf-8' }],
    [
      'meta',
      { name: 'viewport', content: 'width=device-width,initial-scale=1' },
    ],
    ['meta', { name: 'generator', content: `VuePress ${__VERSION__}` }],
  ]

  return dedupeHead(head)
}
