import { chalk, debug, logger } from '@vuepress/utils'
import type { HookQueue, HookItem, HooksName, HooksResult } from '../types'

const log = debug('vuepress:core/plugin-api')

/**
 * Create hook queue for plugin system
 */
export const createHookQueue = <T extends HooksName>(name: T): HookQueue<T> => {
  const items: HookItem<T>[] = []

  const hookQueue: HookQueue<T> = {
    name,
    items,
    add: (item) => {
      items.push(item)
    },
    process: async (...args) => {
      // store the results of all hook items
      const results: HooksResult[T][] = []

      // process all hook items
      for (const item of items) {
        log(
          `process ${chalk.magenta(name)} from ${chalk.magenta(
            item.pluginName
          )}`
        )

        try {
          // process and get the result of the the hook item
          // @ts-ignore
          const result = (await item.hook(...args)) as HooksResult[T]

          // push the result to results array
          if (result !== undefined) {
            results.push(result)
          }
        } catch (error) {
          logger.error(
            `error in hook ${chalk.magenta(name)} from ${chalk.magenta(
              item.pluginName
            )}`
          )
          throw error
        }
      }

      return results
    },
  }

  return hookQueue
}
