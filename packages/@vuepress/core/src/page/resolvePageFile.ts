import { resolveFileContent, resolveFilePath } from './file'
import type { App, PageOptions } from '../types'

export const resolvePageFile = async (
  app: App,
  options: PageOptions
): Promise<{
  filePath: string | null
  filePathRelative: string | null
  fileContent: string
}> => {
  // resolve absolute path and relative path
  const { filePath, filePathRelative } = resolveFilePath(app, options)

  // read the raw file content according to the absolute file path
  const fileContent = await resolveFileContent(options, filePath)

  return {
    filePath,
    filePathRelative,
    fileContent,
  }
}
