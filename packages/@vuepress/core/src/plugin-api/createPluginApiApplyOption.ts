import { OptionsNormalized } from './options'
import { PluginApiOptions } from './createPluginApiOptions'

export type PluginApiApplyOption = <T extends keyof OptionsNormalized>(
  name: T,
  ...args: Parameters<OptionsNormalized[T]>
) => Promise<void>

export const createPluginApiApplyOption = (
  options: PluginApiOptions
): PluginApiApplyOption => {
  const applyOption: PluginApiApplyOption = async (name, ...args) => {
    const option = options[name]
    if (option) {
      // @ts-ignore
      await option.apply(...args)
    }
  }

  return applyOption
}
