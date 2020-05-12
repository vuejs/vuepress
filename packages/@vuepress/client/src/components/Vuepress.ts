import { h, ComponentOptions } from 'vue'
import { layoutComponents } from '@internal/layoutComponents'
import { usePageData } from '../injections'
import { Content } from './Content'

/**
 * Global Layout
 */
export const Vuepress: ComponentOptions = {
  setup() {
    let layout: string

    const { page } = usePageData()

    if (page.value.path) {
      // if current page exists

      // use layout from frontmatter
      const frontmatterLayout = page.value.frontmatter.layout

      if (typeof frontmatterLayout === 'string') {
        layout = frontmatterLayout
      } else {
        // fallback to Layout component
        layout = 'Layout'
      }
    } else {
      layout = 'NotFound'
    }

    const component = layoutComponents[layout]

    if (component) {
      // use layout component
      return () => h(component)
    } else {
      // fallback to Content
      return () => h(Content)
    }
  },
}
