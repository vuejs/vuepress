import type { PageData } from '@vuepress/shared'

declare module '@internal/pagesData' {
  export type { PageData }
  export type PagesData = Record<string, PageData>
  export const pagesData: PagesData
}
