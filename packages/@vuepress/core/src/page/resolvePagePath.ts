import { ensureEndingSlash } from '@vuepress/shared'
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
  let pagePath = options.path || permalink || pathInferred

  if (!pagePath) {
    throw logger.createError(
      `page path is empty, page options: ${JSON.stringify(options)}`
    )
  }

  if (!pagePath.endsWith('.html')) {
    pagePath = ensureEndingSlash(pagePath)
  }

  return encodeURI(pagePath)
}
