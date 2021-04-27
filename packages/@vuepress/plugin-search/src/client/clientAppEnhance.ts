import { h } from 'vue'
import { defineClientAppEnhance } from '@vuepress/client'
import { SearchBox } from './components/SearchBox'
import type { SearchBoxLocales } from './components/SearchBox'

declare const __SEARCH_LOCALES__: SearchBoxLocales
declare const __SEARCH_HOT_KEYS__: string[]
declare const __SEARCH_MAX_SUGGESTIONS__: number

const locales = __SEARCH_LOCALES__
const hotKeys = __SEARCH_HOT_KEYS__
const maxSuggestions = __SEARCH_MAX_SUGGESTIONS__

export default defineClientAppEnhance(({ app }) => {
  // wrap the `<SearchBox />` component with plugin options
  app.component('SearchBox', (props) =>
    h(SearchBox, {
      locales,
      hotKeys,
      maxSuggestions,
      ...props,
    })
  )
})
