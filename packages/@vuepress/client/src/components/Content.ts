import { h } from 'vue'
import type { VNode } from 'vue'
import { pagesComponent } from '@internal/pagesComponent'
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
    const page = usePageData()
    key = page.value.key
  }

  const component = pagesComponent[key]

  // use page component
  if (component) {
    return h(component)
  }

  // fallback
  return h('div', 'Page does not exist. This is a fallback content.')
}
