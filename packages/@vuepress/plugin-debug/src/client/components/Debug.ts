import { h, defineComponent, ref, toDisplayString, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { usePageData, useSiteData, useSiteLocaleData } from '@vuepress/client'
import './Debug.css'

export const Debug = defineComponent({
  name: 'Debug',
  setup() {
    const open = ref(false)

    const { path, name, hash, fullPath } = toRefs(useRoute())
    const site = useSiteData()
    const siteLocale = useSiteLocaleData()
    const page = usePageData()

    return () =>
      h(
        'div',
        {
          class: {
            debug: true,
            open: open.value,
          },
          onClick: () => (open.value = !open.value),
        },
        [
          h('pre', 'debug'),
          h(
            'pre',
            `route ${toDisplayString({
              path: path.value,
              name: name.value,
              hash: hash.value,
              fullPath: fullPath.value,
            })}`
          ),
          h('pre', `page ${toDisplayString(page.value)}`),
          h('pre', `site ${toDisplayString(site.value)}`),
          h('pre', `siteLocale ${toDisplayString(siteLocale.value)}`),
        ]
      )
  },
})

export default Debug
