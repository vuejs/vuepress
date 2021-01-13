import { fs } from '@vuepress/utils'
import type { App, AppWriteTemp } from '../types'

/**
 * Create write temp file util for vuepress app
 */
export const createAppWriteTemp = async (app: App): Promise<AppWriteTemp> => {
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
