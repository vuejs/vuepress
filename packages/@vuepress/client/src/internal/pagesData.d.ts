import type { ClientPageData } from '@vuepress/shared'

declare module '@internal/pagesData' {
  export type PageData = ClientPageData
  export const pagesData: Record<string, PageData>
}
