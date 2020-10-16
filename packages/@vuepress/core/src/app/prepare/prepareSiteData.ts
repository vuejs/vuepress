import type { App, SiteData } from '../../types'

const generateClientSiteData = (app: App): SiteData => {
  return {
    base: app.options.base,
    title: app.options.title,
    description: app.options.description,
    head: app.options.head,
    locales: app.options.locales,
    themeConfig: app.options.themeConfig,
  }
}

/**
 * Generate site data temp file
 */
export const prepareSiteData = async (app: App): Promise<void> => {
  const content = `\
export const siteData = ${JSON.stringify(generateClientSiteData(app), null, 2)}
`

  await app.writeTemp('internal/siteData.js', content)
}
