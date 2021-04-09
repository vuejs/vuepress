import { createElement } from 'preact'
import { computed, h } from 'vue'
import { useRouter } from 'vue-router'
import {
  defineClientAppEnhance,
  usePageLang,
  useRouteLocale,
  useSiteData,
} from '@vuepress/client'
import { resolveRoutePathFromUrl } from '@vuepress/shared'
import type { LocaleConfig } from '@vuepress/shared'
import { Docsearch } from './components/Docsearch'
import type { DocsearchProps } from './components/Docsearch'

declare const DOCSEARCH_PROPS: DocsearchProps
declare const DOCSEARCH_LOCALES: LocaleConfig<DocsearchProps>

const props = DOCSEARCH_PROPS
const locales = DOCSEARCH_LOCALES

const isSpecialClick = (event: MouseEvent): boolean => {
  return (
    event.button === 1 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  )
}

export default defineClientAppEnhance(({ app }) => {
  // wrap the `<Docsearch />` component with plugin options
  // eslint-disable-next-line vue/match-component-file-name
  app.component('Docsearch', {
    setup() {
      const router = useRouter()
      const routeLocale = useRouteLocale()
      const lang = usePageLang()
      const site = useSiteData()

      const propsLocale = computed(() => ({
        ...props,
        ...locales[routeLocale.value],
      }))

      // resolve options for docsearch
      const options = computed(
        () =>
          ({
            ...propsLocale.value,

            searchParameters: {
              ...propsLocale.value.searchParameters,
              facetFilters: [`lang:${lang.value}`].concat(
                propsLocale.value.searchParameters?.facetFilters || []
              ),
            },

            // navigation behavior triggered by `onKeyDown` internally
            navigator: {
              // when pressing Enter without metaKey
              navigate: ({ itemUrl }) => {
                router.push(itemUrl)
              },
            },

            // transform full url to route path
            transformItems: (items) =>
              items.map((item) => {
                // the `item.url` is full url with protocol and hostname
                // so we have to transform it to vue-router path
                return {
                  ...item,
                  url: resolveRoutePathFromUrl(item.url, site.value.base),
                }
              }),

            // handle `onClick` by `router.push`
            hitComponent: ({ hit, children }) =>
              createElement(
                'a',
                {
                  href: hit.url,
                  onClick: (event: MouseEvent) => {
                    if (isSpecialClick(event)) {
                      return
                    }
                    event.preventDefault()
                    router.push(hit.url)
                  },
                },
                children
              ),
          } as DocsearchProps)
      )

      return () => h(Docsearch, { options: options.value })
    },
  })
})
