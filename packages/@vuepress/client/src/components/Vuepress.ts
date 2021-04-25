import { computed, defineComponent, h, resolveComponent } from 'vue'
import { isString } from '@vuepress/shared'
import { layoutComponents } from '@internal/layoutComponents'
import { usePageData } from '../injections'

/**
 * Global Layout
 */
export const Vuepress = defineComponent({
  name: 'Vuepress',

  setup() {
    const page = usePageData()

    // resolve layout component
    const layoutComponent = computed(() => {
      // resolve layout name of current page
      let layoutName: string

      if (page.value.path) {
        // if current page exists

        // use layout from frontmatter
        const frontmatterLayout = page.value.frontmatter.layout

        if (isString(frontmatterLayout)) {
          layoutName = frontmatterLayout
        } else {
          // fallback to default layout
          layoutName = 'Layout'
        }
      } else {
        // if current page does not exist
        // use 404 layout
        layoutName = '404'
      }

      // use theme layout or fallback to custom layout
      return layoutComponents[layoutName] || resolveComponent(layoutName, false)
    })

    return () => h(layoutComponent.value)
  },
})
