import type { DocSearchProps } from '@docsearch/react'
import type { LocaleConfig } from '@vuepress/shared'

export type DocsearchLocaleData = Pick<
  DocSearchProps,
  | 'appId'
  | 'apiKey'
  | 'indexName'
  | 'placeholder'
  | 'searchParameters'
  | 'disableUserPersonalization'
  | 'initialQuery'
>

export interface DocsearchOptions extends DocsearchLocaleData {
  locales?: LocaleConfig<DocsearchLocaleData>
}
