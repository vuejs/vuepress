import { createElement } from 'preact'
import { defineComponent, getCurrentInstance, h, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import type { DocSearchProps } from '@docsearch/react'
import { useSiteData } from '@vuepress/client'
import { resolveRoutePathFromUrl } from '@vuepress/shared'

export type DocsearchProps = DocSearchProps

type DocsearchFuncProps = DocSearchProps & {
  container: string
}

type DocsearchFunc = (props: DocsearchFuncProps) => void

const loadDocsearch = async (): Promise<DocsearchFunc> => {
  const [docsearch] = await Promise.all([
    // @ts-ignore: docsearch types issue
    import('@docsearch/js'),
    // @ts-ignore
    import('@docsearch/css'),
  ])
  return docsearch.default
}

const isSpecialClick = (event: MouseEvent): boolean => {
  return (
    event.button === 1 ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey
  )
}

export const Docsearch = defineComponent({
  name: 'Docsearch',

  props: {
    options: {
      type: Object as PropType<DocsearchProps>,
      required: true,
    },
  },

  setup(props) {
    const router = useRouter()
    const site = useSiteData()
    const vm = getCurrentInstance()

    const initialize = (options: DocsearchProps): void => {
      loadDocsearch().then((docsearch) => {
        docsearch({
          ...options,

          // the container selector
          container: '#docsearch',

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
        })
      })
    }

    const update = (options: DocsearchProps): void => {
      if (vm && vm.vnode.el) {
        vm.vnode.el.innerHTML = '<div id="docsearch"></div>'
        initialize(options)
      }
    }

    watch(
      () => props.options,
      (val, prevVal) => {
        // check if the options are modified
        const keys = Object.keys(val)
        const prevKeys = Object.keys(prevVal)
        if (
          keys.length !== prevKeys.length ||
          keys.some((key) => val[key] !== prevVal[key])
        ) {
          update(val)
        }
      }
    )

    onMounted(() => initialize(props.options))

    return () => h('div', { id: 'docsearch' })
  },
})
