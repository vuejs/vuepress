/**
 * Resolve the final path of a page
 */
export const resolvePagePath = (
  permalink: string | null,
  pathInferred: string | null
): string => {
  // use permalink first
  if (permalink) {
    return permalink
  }

  // use inferred path
  if (pathInferred) {
    // TODO: handle index file path
    return pathInferred.replace(/\/(README|index).html$/i, '/')
  }

  return ''
}
