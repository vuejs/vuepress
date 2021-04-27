import type { PageData } from '@vuepress/shared'

export interface SearchIndexItem
  extends Pick<PageData, 'title' | 'headers' | 'path'> {
  pathLocale: string
  extraFields: string[]
}

export type SearchIndex = SearchIndexItem[]
