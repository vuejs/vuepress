import type { PageOptions } from '../types'

/**
 * Resolve the final path of a page
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
  // use permalink first
  if (permalink) {
    return permalink
  }

  // use inferred path
  if (pathInferred) {
    // TODO: handle index file path
    return pathInferred.replace(/\/(README|index).html$/i, '/')
  }

  // use options path
  return options.path ?? ''
}
