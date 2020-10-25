import type { PluginApi } from '../types'
import { createPluginApiHooks } from './createPluginApiHooks'
import { createPluginApiRegisterHooks } from './createPluginApiRegisterHooks'

export const createPluginApi = (): PluginApi => {
  const plugins: PluginApi['plugins'] = []
  const hooks = createPluginApiHooks()
  const registerHooks = createPluginApiRegisterHooks(plugins, hooks)

  return {
    plugins,
    hooks,
    registerHooks,
  }
}
