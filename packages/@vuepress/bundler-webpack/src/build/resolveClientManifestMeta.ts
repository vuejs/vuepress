import { resolveFileMeta } from './resolveFileMeta'
import type { ClientManifest } from './ssr'
import type { FileMeta, ModuleFilesMetaMap } from './types'

/**
 * Resolve files meta from clientManifest
 */
export const resolveClientManifestMeta = ({
  all,
  initial,
  async,
  modules,
}: ClientManifest): {
  allFilesMeta: FileMeta[]
  initialFilesMeta: FileMeta[]
  asyncFilesMeta: FileMeta[]
  moduleFilesMetaMap: ModuleFilesMetaMap
} => {
  // all files meta
  const allFilesMeta = all.map(resolveFileMeta)

  // initial files meta
  const initialFilesMeta = initial.map(resolveFileMeta)

  // async files meta
  const asyncFilesMeta = async.map(resolveFileMeta)

  // module to files meta map
  const moduleFilesMetaMap = Object.fromEntries(
    Object.entries(modules).map(([moduleRequest, assetFilesIndex]) => {
      return [
        moduleRequest,
        assetFilesIndex
          .map((fileIndex) => allFilesMeta[fileIndex])
          .filter(
            ({ file, type }) =>
              async.includes(file) || (type !== 'style' && type !== 'script')
          ),
      ]
    })
  )

  return {
    allFilesMeta,
    initialFilesMeta,
    asyncFilesMeta,
    moduleFilesMetaMap,
  }
}
