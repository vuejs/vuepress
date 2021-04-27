import { computed } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import type { PageHeader } from '@vuepress/shared'
import type { SearchIndex, SearchIndexItem } from '../../shared'
import { isQueryMatched } from '../utils'

export interface SearchSuggestion {
  link: string
  title: string
  header?: string
}

export const useSearchSuggestions = ({
  searchIndex,
  routeLocale,
  query,
  maxSuggestions,
}: {
  searchIndex: Ref<SearchIndex>
  routeLocale: Ref<string>
  query: Ref<string>
  maxSuggestions: Ref<number>
}): ComputedRef<SearchSuggestion[]> => {
  // filter search index of current locale
  const localeSearchIndex = computed(() =>
    searchIndex.value.filter((item) => item.pathLocale === routeLocale.value)
  )

  return computed(() => {
    const searchStr = query.value.trim().toLowerCase()
    if (!searchStr) return []

    const suggestions: SearchSuggestion[] = []

    const matchPageHeader = (
      searchIndexItem: SearchIndexItem,
      header: PageHeader
    ): void => {
      if (isQueryMatched(searchStr, [header.title])) {
        suggestions.push({
          link: `${searchIndexItem.path}#${header.slug}`,
          title: searchIndexItem.title,
          header: header.title,
        })
      }

      for (const child of header.children) {
        if (suggestions.length >= maxSuggestions.value) {
          return
        }

        matchPageHeader(searchIndexItem, child)
      }
    }

    for (const searchIndexItem of localeSearchIndex.value) {
      if (suggestions.length >= maxSuggestions.value) {
        break
      }

      // match page title and extra fields
      if (
        isQueryMatched(searchStr, [
          searchIndexItem.title,
          ...searchIndexItem.extraFields,
        ])
      ) {
        suggestions.push({
          link: searchIndexItem.path,
          title: searchIndexItem.title,
        })
        continue
      }

      // match page headers
      for (const header of searchIndexItem.headers) {
        if (suggestions.length >= maxSuggestions.value) {
          break
        }

        matchPageHeader(searchIndexItem, header)
      }
    }

    return suggestions
  })
}
