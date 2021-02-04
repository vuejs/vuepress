import type { App } from '../../types'

/**
 * Generate site data temp file
 */
export const prepareSiteData = async (app: App): Promise<void> => {
  const content = `\
export const siteData = ${JSON.stringify(app.siteData, null, 2)}
`

  await app.writeTemp('internal/siteData.js', content)
}
