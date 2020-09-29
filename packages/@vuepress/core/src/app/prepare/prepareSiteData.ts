import type { App, ClientSiteData } from '../../types'

const generateClientSiteData = (app: App): ClientSiteData => {
  return {
    base: app.options.base,
    title: app.options.title,
    description: app.options.description,
    locales: app.options.locales,
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
