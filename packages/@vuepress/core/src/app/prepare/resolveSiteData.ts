import type { App, SiteData } from '../../types'

/**
 * Resolve site data for client usage
 */
export const resolveSiteData = (app: App): SiteData => {
  return {
    base: app.options.base,
    lang: app.options.lang,
    title: app.options.title,
    description: app.options.description,
    head: app.options.head,
    locales: app.options.locales,
    themeConfig: app.options.themeConfig,
  }
}
