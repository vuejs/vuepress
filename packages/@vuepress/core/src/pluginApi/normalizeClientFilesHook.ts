import { isArray, isFunction } from '@vuepress/shared'
import { fs } from '@vuepress/utils'
import type { ClientFilesHook } from '../types'

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
    }
  }

  return result
}
