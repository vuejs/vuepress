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
}): string => encodeURI(permalink || pathInferred || options.path || '')
