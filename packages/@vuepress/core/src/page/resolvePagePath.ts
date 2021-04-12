import { logger } from '@vuepress/utils'
import type { PageOptions } from '../types'

/**
 * Resolve the final route path of a page
 */
export const resolvePagePath = ({
  permalink,
  pathInferred,
  options,
}: {
  permalink: string | null
  pathInferred: string | null
  options: PageOptions
}): string => {
  const pagePath = permalink || pathInferred || options.path

  if (!pagePath) {
    throw logger.createError(
      `page path is empty, page options: ${JSON.stringify(options)}`
    )
  }

  return encodeURI(pagePath)
}
