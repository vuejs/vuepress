import type { PageData } from '@vuepress/shared'

declare module '@internal/pagesData' {
  export const pagesData: Record<string, () => Promise<PageData>>
}
