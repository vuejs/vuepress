import { computed, defineComponent, h, ref, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import { useRouteLocale } from '@vuepress/client'
import type { LocaleConfig } from '@vuepress/shared'
import {
  useHotKeys,
  useSearchIndex,
  useSearchSuggestions,
  useSuggestionsFocus,
} from '../composables'
import './SearchBox.css'

export type SearchBoxLocales = LocaleConfig<{
  placeholder: string
}>

export const SearchBox = defineComponent({
  name: 'SearchBox',

  props: {
    locales: {
      type: Object as PropType<SearchBoxLocales>,
      required: false,
      default: () => ({}),
    },

    hotKeys: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },

    maxSuggestions: {
      type: Number,
      required: false,
      default: 5,
    },
  },

  setup(props) {
    const { locales, hotKeys, maxSuggestions } = toRefs(props)

    const router = useRouter()
    const routeLocale = useRouteLocale()
    const searchIndex = useSearchIndex()

    const input = ref<HTMLInputElement | null>(null)
    const isActive = ref(false)
    const query = ref('')
    const locale = computed(() => locales.value[routeLocale.value] ?? {})

    const suggestions = useSearchSuggestions({
      searchIndex,
      routeLocale,
      query,
      maxSuggestions,
    })
    const { focusIndex, focusNext, focusPrev } = useSuggestionsFocus(
      suggestions
    )
    useHotKeys({ input, hotKeys })

    const showSuggestions = computed(
      () => isActive.value && !!suggestions.value.length
    )
    const onArrowUp = (): void => {
      if (!showSuggestions.value) {
        return
      }
      focusPrev()
    }
    const onArrowDown = (): void => {
      if (!showSuggestions.value) {
        return
      }
      focusNext()
    }
    const goTo = (index: number): void => {
      if (!showSuggestions.value) {
        return
      }

      const suggestion = suggestions.value[index]
      if (!suggestion) {
        return
      }

      router.push(suggestion.link).then(() => {
        query.value = ''
        focusIndex.value = 0
      })
    }

    return () =>
      h(
        'div',
        {
          class: 'search-box',
        },
        [
          h('input', {
            ref: input,
            placeholder: locale.value.placeholder,
            autocomplete: 'off',
            spellcheck: false,
            value: query.value,
            onFocus: () => (isActive.value = true),
            onBlur: () => (isActive.value = false),
            onInput: (event) => (query.value = event.target.value),
            onKeydown: (event) => {
              switch (event.key) {
                case 'ArrowUp': {
                  onArrowUp()
                  break
                }
                case 'ArrowDown': {
                  onArrowDown()
                  break
                }
                case 'Enter': {
                  goTo(focusIndex.value)
                  break
                }
              }
            },
          }),
          showSuggestions.value &&
            h(
              'ul',
              {
                class: 'suggestions',
                onMouseleave: () => (focusIndex.value = -1),
              },
              suggestions.value.map(({ link, title, header }, index) =>
                h(
                  'li',
                  {
                    class: [
                      'suggestion',
                      {
                        focus: focusIndex.value === index,
                      },
                    ],
                    onMouseenter: () => (focusIndex.value = index),
                    onMousedown: () => goTo(index),
                  },
                  h(
                    'a',
                    {
                      href: link,
                      onClick: (event) => event.preventDefault(),
                    },
                    [
                      h(
                        'span',
                        {
                          class: 'page-title',
                        },
                        title
                      ),
                      header &&
                        h('span', { class: 'page-header' }, `> ${header}`),
                    ]
                  )
                )
              )
            ),
        ]
      )
  },
})
