import {
  PluginApiApplyOption,
  createPluginApiApplyOption,
} from './createPluginApiApplyOption'
import {
  PluginApiOptions,
  createPluginApiOptions,
} from './createPluginApiOptions'
import {
  PluginApiPlugins,
  createPluginApiPlugins,
} from './createPluginApiPlugins'
import {
  PluginApiRegisterOptions,
  createPluginApiRegisterOptions,
} from './createPluginApiRegisterOptions'
import { PluginApiUse, createPluginApiUse } from './createPluginApiUse'

export interface PluginApi {
  /**
   * Plugins that have been used
   */
  plugins: PluginApiPlugins

  /**
   * All available option objects
   */
  options: PluginApiOptions

  /**
   * Use a plugin
   *
   * Should be invoked before `registerOptions()`
   */
  use: PluginApiUse

  /**
   * Register options of plugins
   *
   * Should be invoked after `use()`, and before `applyOption()`
   */
  registerOptions: PluginApiRegisterOptions

  /**
   * Apply a registered option with corresponding params
   *
   * Should be invoked after `applyOption()`
   */
  applyOption: PluginApiApplyOption
}

export const createPluginApi = (): PluginApi => {
  const plugins = createPluginApiPlugins()
  const options = createPluginApiOptions()
  const use = createPluginApiUse(plugins)
  const registerOptions = createPluginApiRegisterOptions(plugins, options)
  const applyOption = createPluginApiApplyOption(options)

  return {
    plugins,
    options,
    use,
    registerOptions,
    applyOption,
  }
}
