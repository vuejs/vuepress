import { isArray, isFunction } from '@vuepress/shared'
import { chalk, debug, fs } from '@vuepress/utils'
import type { ClientFilesHook } from '../types'

const log = debug('vuepress:core/plugin-api')

/**
 * Normalize hook for client files
 */
export const normalizeClientFilesHook = (
  hook: ClientFilesHook['exposed']
): ClientFilesHook['normalized'] => async (app) => {
  // resolve clientFiles result
  const clientFilesResult = isFunction(hook) ? await hook(app) : hook

  const clientFiles = isArray(clientFilesResult)
    ? clientFilesResult
    : [clientFilesResult]

  // filter files that do not exist
  const result: string[] = []
  for (const filePath of clientFiles) {
    const isExisted = await fs.pathExists(filePath)
    if (isExisted) {
      result.push(filePath)
    } else {
      log(`client file does not exist ${chalk.magenta(filePath)}`)
    }
  }

  return result
}
