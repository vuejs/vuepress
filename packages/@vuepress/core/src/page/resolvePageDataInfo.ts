import type { App } from '../types'

/**
 * Resolve page data file path
 */
export const resolvePageDataInfo = ({
  app,
  key,
}: {
  app: App
  key: string
}): {
  dataFilePath: string
  dataFilePathRelative: string
  dataFileChunkName: string
} => {
  const dataFilePathRelative = `internal/pageData/${key}.js`
  const dataFilePath = app.dir.temp(dataFilePathRelative)
  const dataFileChunkName = key

  return {
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName,
  }
}
