import { ref, readonly } from 'vue'
import type { Ref } from 'vue'
import type { PageData } from '@vuepress/shared'
import { pagesData } from './pagesData'

export type { PageData }
export type PageDataRef = Ref<PageData>

const pageDataEmpty = readonly({
  key: '',
  path: '',
  title: '',
  frontmatter: {},
  excerpt: '',
  headers: [],
} as PageData) as PageData

export const pageData: PageDataRef = ref(pageDataEmpty)

export const usePageData = (): PageDataRef => {
  return pageData
}

export const resolvePageData = async (routePath: string): Promise<PageData> => {
  const pageDataResolver = pagesData.value[routePath]

  if (!pageDataResolver) {
    return pageDataEmpty
  }

  const pageData = await pageDataResolver()

  return pageData ?? pageDataEmpty
}

if (module.hot) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updatePageData = (newPageData: PageData) => {
    if (newPageData.key === pageData.value.key) {
      pageData.value = newPageData
    }
  }
}
