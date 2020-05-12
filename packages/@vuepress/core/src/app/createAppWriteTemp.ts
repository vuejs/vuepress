import { parse } from 'path'
import { fs } from '@vuepress/utils'
import { App } from './createApp'

/**
 * Internal temp cache
 */
type TempCache = Map<string, string>

/**
 * Write temp file util
 */
export type AppWriteTemp = (file: string, content: string) => Promise<string>

/**
 * Create write temp file util for vuepress app
 */
export const createAppWriteTemp = async (app: App): Promise<AppWriteTemp> => {
  const dirTemp = app.dir.temp()

  // ensure temp directory exists
  await fs.ensureDir(dirTemp)

  // TODO: check if temp dir is safe to empty
  // empty temp directory
  await fs.emptyDir(dirTemp)

  const tempCache: TempCache = new Map()

  const writeTemp: AppWriteTemp = async (file: string, content: string) => {
    const filePath = app.dir.temp(file)
    const contentCached = tempCache.get(filePath)
    if (contentCached !== content) {
      await fs.ensureDir(parse(filePath).dir)
      await fs.writeFile(filePath, content)
      tempCache.set(filePath, content)
    }
    return filePath
  }

  return writeTemp
}
