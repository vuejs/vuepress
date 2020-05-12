import { fs } from '@vuepress/utils'
import { PageConfig } from './createPage'

export const resolveFileContent = async (
  config: PageConfig,
  filePath: string | null
): Promise<string> => {
  if (filePath) {
    // read page content from file
    return fs.readFile(filePath, 'utf-8')
  }

  return config.content || ''
}
