import { fs } from '@vuepress/utils'
import type { PageOptions } from '../types'

export const resolvePageFileContent = async (
  filePath: string | null,
  options: PageOptions
): Promise<string> => {
  if (filePath) {
    // read page content from file
    return fs.readFile(filePath, 'utf-8')
  }

  // load content from options
  return options.content || ''
}
