import { computed, ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { PageData } from '@internal/siteData'
import { useSiteData } from './siteData'

export const usePageData = (): {
  page: ComputedRef<PageData>
  title: ComputedRef<PageData['title']>
  frontmatter: ComputedRef<PageData['frontmatter']>
} => {
  const siteData = useSiteData()
  const route = useRoute()

  const page = computed(
    () =>
      siteData.pages.find((item) => item.path === route.path) || {
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
