import { h } from 'vue'
import type { FunctionalComponent } from 'vue'
import { pagesComponents } from '@internal/pagesComponents'
import { usePageData } from '../injections'

/**
 * Markdown rendered content
 */
export const Content: FunctionalComponent<{
  pageKey?: string
}> = (props) => {
  let key: string

  // use the page key from props directly
  if (props.pageKey) {
    key = props.pageKey
  } else {
    // get current page key from page data
    const page = usePageData()
    key = page.value.key
  }

  const component = pagesComponents[key]

  // use page component
  if (component) {
    return h(component)
  }

  // fallback
  return h(
    'div',
    __DEV__
      ? 'Page does not exist. This is a fallback content.'
      : '404 Not Found'
  )
}

Content.displayName = 'Content'

Content.props = {
  pageKey: {
    type: String,
    required: false,
  },
}
