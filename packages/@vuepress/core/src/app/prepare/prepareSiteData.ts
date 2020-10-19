import type { App } from '../../types'
import { resolveSiteData } from './resolveSiteData'

/**
 * Generate site data temp file
 */
export const prepareSiteData = async (app: App): Promise<void> => {
  const content = `\
export const siteData = ${JSON.stringify(resolveSiteData(app), null, 2)}
`

  await app.writeTemp('internal/siteData.js', content)
}
