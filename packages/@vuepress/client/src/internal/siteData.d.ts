import type { ClientSiteData } from '@vuepress/shared'

declare module '@internal/siteData' {
  export type SiteData = ClientSiteData
  export const siteData: SiteData
}
