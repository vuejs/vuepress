import { isPromise } from '@vuepress/shared'
import type {
  HookQueue,
  HookItem,
  HooksName,
  HooksNormalized,
  HooksResult,
} from '../types'

/**
 * Create hook queue for plugin system
 */
export const createHookQueue = <T extends HooksName>(
  name: T,
  parallel = false
): HookQueue<T> => {
  const items: HookItem<T>[] = []

  const hookQueue: HookQueue<T> = {
    // hook name
    name,
    // hook items array
    items,
    // add hook item to queue
    add: (item) => {
      items.push(item)
    },
    // process the hook queue and get the results
    process: async (...args) => {
      // store the results of all hook items
      const results: HooksResult[T][] = []

      // process a hook item and store the result
      const processItem = async (
        item: HookItem<T>,
        ...args: Parameters<HooksNormalized[T]>
      ): Promise<void> => {
        try {
          // process and get the result of the the hook item
          // @ts-ignore
          const result = (await item.hook(...args)) as HooksResult[T]

          // push the result to results array
          if (result !== undefined) {
            results.push(result)
          }
        } catch (error) {
          // TODO: logger
          console.log(`${item.pluginName}`)
          throw error
        }
      }

      // process all hook items in current queue
      if (parallel) {
        // process in parallel
        await Promise.all(items.map((item) => processItem(item, ...args)))
      } else {
        // process in serial
        for (const item of items) {
          await processItem(item, ...args)
        }
      }

      return results
    },
    // process the hook queue and get the results
    processSync: (...args) => {
      // store the results of all hook items
      const results: HooksResult[T][] = []

      // process all hook items
      for (const item of items) {
        try {
          // @ts-ignore
          // process and get the result of the the hook item
          const result = item.hook(...args) as HooksResult[T]

          // push the result to results array
          if (result !== undefined && !isPromise(result)) {
            results.push(result)
          }
        } catch (error) {
          // TODO: logger
          console.log(`${item.pluginName}`)
          throw error
        }
      }
      return results
    },
  }

  return hookQueue
}
