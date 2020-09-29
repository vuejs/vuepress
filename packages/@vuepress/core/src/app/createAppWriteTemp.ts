import { fs } from '@vuepress/utils'
import type { App, AppWriteTemp } from '../types'

/**
 * Create write temp file util for vuepress app
 */
export const createAppWriteTemp = async (app: App): Promise<AppWriteTemp> => {
  const dirTemp = app.dir.temp()

  // TODO: add flag to control empty temp directory or not
  // TODO: check if temp dir is safe to empty
  // empty temp directory
  await fs.emptyDir(dirTemp)

  // TODO: temp cache from files
  const tempCache = new Map<string, string>()

  const writeTemp: AppWriteTemp = async (file: string, content: string) => {
    const filePath = app.dir.temp(file)
    const contentCached = tempCache.get(filePath)
    if (contentCached !== content) {
      await fs.outputFile(filePath, content)
      tempCache.set(filePath, content)
    }
    return filePath
  }

  return writeTemp
}
