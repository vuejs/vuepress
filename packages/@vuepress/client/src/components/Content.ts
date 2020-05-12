import { h, VNode } from 'vue'
import { pageComponents } from '@internal/pageComponents'
import { usePageData } from '../injections'

/**
 * Markdown rendered content
 */
export const Content = (props: { pageKey: string }): VNode => {
  let key: string

  // use the page key from props directly
  if (props?.pageKey) {
    key = props.pageKey
  } else {
    // get current page key from page data
    const { page } = usePageData()
    key = page.value.key
  }

  const component = pageComponents[key]

  if (component) {
    // use page component
    return h(component)
  } else {
    // fallback
    return h('div', 'Page does not exist. This is a fallback content.')
  }
}
