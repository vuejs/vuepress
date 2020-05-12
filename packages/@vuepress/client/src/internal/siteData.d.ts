import { ClientData, ClientDataPage } from '@vuepress/core'

declare module '@internal/siteData' {
  export type SiteData = ClientData
  export type PageData = ClientDataPage
  export const siteData: SiteData
}
