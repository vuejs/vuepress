import { h, toDisplayString, toRefs } from 'vue'
import type { ComponentOptions } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteData, usePageData } from '../injections'

export const Debug: ComponentOptions = {
  setup() {
    const { path, name, hash, fullPath } = toRefs(useRoute())
    const site = useSiteData()
    const page = usePageData()

    return () =>
      h(
        'div',
        {
          class: 'vuepress-debug',
        },
        [
          h(
            'pre',
            `route ${toDisplayString({
              path: path.value,
              name: name.value,
              hash: hash.value,
              fullPath: fullPath.value,
            })}`
          ),
          h('pre', `site ${toDisplayString(site.value)}`),
          h('pre', `page ${toDisplayString(page.value)}`),
        ]
      )
  },
}
