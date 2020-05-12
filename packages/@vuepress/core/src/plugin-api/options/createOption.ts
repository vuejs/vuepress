import { OptionsNormalized } from './types'

export interface OptionItem<T extends keyof OptionsNormalized> {
  pluginName: string
  value: OptionsNormalized[T]
}

export type OptionApply<T extends keyof OptionsNormalized> = (
  ...args: Parameters<OptionsNormalized[T]>
) => Promise<void>

export interface Option<T extends keyof OptionsNormalized> {
  items: OptionItem<T>[]
  add: (item: OptionItem<T>) => void
  apply: OptionApply<T>
}

export const createOption = <T extends keyof OptionsNormalized>({
  applyInParallel = false,
}: {
  applyInParallel?: boolean
} = {}): Option<T> => {
  const items: OptionItem<T>[] = []

  const itemApply = async (
    item: OptionItem<T>,
    ...args: Parameters<OptionsNormalized[T]>
  ): Promise<void> => {
    try {
      // @ts-ignore
      await item.value(...args)
    } catch (error) {
      // TODO: logger
      console.log(`${item.pluginName}`)
      throw error
    }
  }

  const option: Option<T> = {
    items,
    add: (item) => {
      option.items.push(item)
    },
    apply: async (...args) => {
      if (applyInParallel) {
        await Promise.all(option.items.map((item) => itemApply(item, ...args)))
      } else {
        for (const item of option.items) {
          await itemApply(item, ...args)
        }
      }
    },
  }

  return option
}
