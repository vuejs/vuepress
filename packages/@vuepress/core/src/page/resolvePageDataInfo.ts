import { path } from '@vuepress/utils'
import type { App } from '../types'

/**
 * Resolve page data file path
 */
export const resolvePageDataInfo = ({
  app,
  htmlFilePathRelative,
  key,
}: {
  app: App
  htmlFilePathRelative: string
  key: string
}): {
  dataFilePath: string
  dataFilePathRelative: string
  dataFileChunkName: string
} => {
  const dataFilePathRelative = path.join('pages', `${htmlFilePathRelative}.js`)
  const dataFilePath = app.dir.temp(dataFilePathRelative)
  const dataFileChunkName = key

  return {
    dataFilePath,
    dataFilePathRelative,
    dataFileChunkName,
  }
}
