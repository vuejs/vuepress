import { defineComponent, getCurrentInstance, h, onMounted, watch } from 'vue'
import type { PropType } from 'vue'
import type { DocSearchProps } from '@docsearch/react'

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

export const Docsearch = defineComponent({
  name: 'Docsearch',

  props: {
    options: {
      type: Object as PropType<DocsearchProps>,
      required: true,
    },
  },

  setup(props) {
    const vm = getCurrentInstance()

    const initialize = (options: DocsearchProps): void => {
      loadDocsearch().then((docsearch) => {
        docsearch({
          ...options,
          // the container selector
          container: '#docsearch',
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
