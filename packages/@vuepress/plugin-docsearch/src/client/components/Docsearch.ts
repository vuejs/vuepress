import { computed, defineComponent, h, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
// @ts-ignore: docsearch type issue
import docsearch from '@docsearch/js'
import { usePageLang, useRouteLocale } from '@vuepress/client'
import type { DocsearchOptions } from '../../shared'
import { useDocsearchShim } from '../composables'

import '@docsearch/css'

export const Docsearch = defineComponent({
  name: 'Docsearch',

  props: {
    options: {
      type: Object as PropType<DocsearchOptions>,
      required: true,
    },
  },

  setup(props) {
    const routeLocale = useRouteLocale()
    const lang = usePageLang()
    const docsearchShim = useDocsearchShim()

    // resolve docsearch props for current locale
    const propsLocale = computed(() => ({
      ...props.options,
      ...props.options.locales?.[routeLocale.value],
    }))

    const facetFilters: string[] = []

    const initialize = (): void => {
      facetFilters.splice(
        0,
        facetFilters.length,
        `lang:${lang.value}`,
        ...(propsLocale.value.searchParameters?.facetFilters ?? [])
      )
      docsearch({
        ...docsearchShim,
        ...propsLocale.value,
        container: '#docsearch-container',
        searchParameters: {
          ...propsLocale.value.searchParameters,
          facetFilters,
        },
      })
    }

    onMounted(() => {
      initialize()

      // re-initialize if the options is changed
      watch(
        [routeLocale, propsLocale],
        (
          [curRouteLocale, curPropsLocale],
          [prevRouteLocale, prevPropsLocale]
        ) => {
          if (curRouteLocale === prevRouteLocale) return
          if (
            JSON.stringify(curPropsLocale) !== JSON.stringify(prevPropsLocale)
          ) {
            initialize()
          }
        }
      )

      // modify the facetFilters in place to avoid re-initializing docsearch
      // when page lang is changed
      watch(lang, (curLang, prevLang) => {
        if (curLang !== prevLang) {
          const prevIndex = facetFilters.findIndex(
            (item) => item === `lang:${prevLang}`
          )
          if (prevIndex > -1) {
            facetFilters.splice(prevIndex, 1, `lang:${curLang}`)
          }
        }
      })
    })

    return () => h('div', { id: 'docsearch-container' })
  },
})
