import { h } from 'vue'
import type { ComponentOptions } from 'vue'
import { layoutComponents } from '@internal/layoutComponents'
import { usePageData } from '../injections'
import { Content } from './Content'

/**
 * Global Layout
 */
export const Vuepress: ComponentOptions = {
  setup() {
    // get layout of current page
    let layoutName = 'NotFound'

    const { page } = usePageData()

    if (page.value.path) {
      // if current page exists

      // use layout from frontmatter
      const frontmatterLayout = page.value.frontmatter.layout

      if (typeof frontmatterLayout === 'string') {
        layoutName = frontmatterLayout
      } else {
        // fallback to Layout component
        layoutName = 'Layout'
      }
    }

    const layoutComponent = layoutComponents[layoutName]

    if (layoutComponent) {
      // use layout component
      return () => h(layoutComponent)
    } else {
      // fallback to Content
      return () => h(Content)
    }
  },
}
