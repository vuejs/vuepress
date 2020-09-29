import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { pagesData } from '@internal/pagesData'
import type { PageData } from '@internal/pagesData'

export const usePageData = (): {
  page: ComputedRef<PageData>
  title: ComputedRef<PageData['title']>
  frontmatter: ComputedRef<PageData['frontmatter']>
} => {
  const route = useRoute()

  const page = computed(
    () =>
      pagesData[route.path] ?? {
        key: '',
        path: '',
        title: '',
        frontmatter: {},
        excerpt: '',
        headers: [],
      }
  )

  const title = computed(() => page.value.title)
  const frontmatter = computed(() => page.value.frontmatter)

  return {
    page,
    title,
    frontmatter,
  }
}
