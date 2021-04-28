import { ref, readonly } from 'vue'
import type { Ref } from 'vue'
import type { PageData } from '@vuepress/shared'
import { pagesData } from './pagesData'

export type { PageData }
export type PageDataRef<
  T extends Record<any, any> = Record<never, never>
> = Ref<PageData<T>>

const pageDataEmpty = readonly({
  key: '',
  path: '',
  title: '',
  lang: '',
  frontmatter: {},
  excerpt: '',
  headers: [],
} as PageData) as PageData

export const pageData: PageDataRef = ref(pageDataEmpty)

export const usePageData = <
  T extends Record<any, any> = Record<never, never>
>(): PageDataRef<T> => {
  return pageData as PageDataRef<T>
}

export const resolvePageData = async (pageKey: string): Promise<PageData> => {
  const pageDataResolver = pagesData.value[pageKey]

  if (!pageDataResolver) {
    return pageDataEmpty
  }

  const pageData = await pageDataResolver()

  return pageData ?? pageDataEmpty
}

if (import.meta.webpackHot || import.meta.hot) {
  // reuse vue HMR runtime
  __VUE_HMR_RUNTIME__.updatePageData = (data: PageData) => {
    pagesData.value[data.key] = () => Promise.resolve(data)
    if (data.key === pageData.value.key) {
      pageData.value = data
    }
  }
}
