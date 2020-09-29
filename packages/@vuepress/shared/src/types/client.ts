import type { BasePage } from './page'
import type { SiteConfig } from './site'

/**
 * Site data that will be generated for client
 */
export type ClientSiteData = Pick<
  Required<SiteConfig>,
  'base' | 'title' | 'description' | 'locales'
>

/**
 * Page data that will be generated for client
 */
export type ClientPageData = BasePage
