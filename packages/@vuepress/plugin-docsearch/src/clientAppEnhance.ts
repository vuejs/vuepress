import { computed, h } from 'vue'
import { useRouteLocale } from '@vuepress/client'
import type { ClientAppEnhance } from '@vuepress/client'
import type { LocaleConfig } from '@vuepress/shared'
import { Docsearch } from './components/Docsearch'
import type { DocsearchProps } from './components/Docsearch'

declare const DOCSEARCH_PROPS: DocsearchProps
declare const DOCSEARCH_LOCALES: LocaleConfig<
  Pick<DocsearchProps, 'placeholder'>
>

const props = DOCSEARCH_PROPS
const locales = DOCSEARCH_LOCALES

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  // wrap the `<Docsearch />` component with plugin options
  // eslint-disable-next-line vue/match-component-file-name
  app.component('Docsearch', {
    setup() {
      const routeLocale = useRouteLocale()

      const locale = computed(() => locales[routeLocale.value])

      return () =>
        h(Docsearch, {
          options: {
            ...props,
            ...locale.value,
            // TODO: add language filter to support multiple locales
          },
        })
    },
  })
}

export default clientAppEnhance
