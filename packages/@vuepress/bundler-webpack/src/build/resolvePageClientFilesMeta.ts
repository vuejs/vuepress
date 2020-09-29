import type { FileMeta, ModuleFilesMetaMap } from './types'

/**
 * Get all client files according to module requests of a page
 */
export const resolvePageClientFilesMeta = ({
  moduleRequests,
  moduleFilesMetaMap,
}: {
  moduleRequests: string[]
  moduleFilesMetaMap: ModuleFilesMetaMap
}): FileMeta[] => {
  const files: Set<FileMeta> = new Set()
  moduleRequests.forEach((request) => {
    moduleFilesMetaMap[request]?.forEach((file) => files.add(file))
  })
  return Array.from(files)
}
