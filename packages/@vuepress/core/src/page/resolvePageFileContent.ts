import { debug, fs } from '@vuepress/utils'
import type { PageOptions } from '../types'

const log = debug('vuepress:core/page')

/**
 * Resolve page file content according to filePath or options content
 */
export const resolvePageFileContent = async ({
  filePath,
  options,
}: {
  filePath: string | null
  options: PageOptions
}): Promise<string> => {
  if (filePath) {
    try {
      // read page content from file
      const content = await fs.readFile(filePath, 'utf-8')
      return content
    } catch (e) {
      log(e.message)
    }
  }

  // load raw content from options
  return options.content ?? ''
}
