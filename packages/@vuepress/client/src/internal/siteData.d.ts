import type { SiteData } from '@vuepress/shared'

declare module '@internal/siteData' {
  export type { SiteData }
  export const siteData: SiteData
}
