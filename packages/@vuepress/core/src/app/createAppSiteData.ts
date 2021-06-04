import type { AppOptions, SiteData } from '../types'

/**
 * Create site data for vuepress app
 *
 * Site data will also be used in client
 */
export const createAppSiteData = (options: AppOptions): SiteData => ({
  base: options.base,
  lang: options.lang,
  title: options.title,
  description: options.description,
  head: options.head,
  locales: options.locales,
})
