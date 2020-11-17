import type { PluginApi } from '../types'
import { normalizeReturnObjectHook } from './normalizeReturnObjectHook'
import { normalizeClientFilesHook } from './normalizeClientFilesHook'

export const createPluginApiRegisterHooks = (
  plugins: PluginApi['plugins'],
  hooks: PluginApi['hooks']
): PluginApi['registerHooks'] => () => {
  plugins.forEach(
    ({
      name: pluginName,

      alias,
      define,
      clientAppEnhanceFiles,
      clientAppRootComponentFiles,
      clientAppSetupFiles,

      ...commonHooks
    }) => {
      /**
       * hooks that need to be normalized
       */
      if (alias) {
        hooks.alias.add({
          pluginName,
          hook: normalizeReturnObjectHook(alias),
        })
      }

      if (define) {
        hooks.define.add({
          pluginName,
          hook: normalizeReturnObjectHook(define),
        })
      }

      if (clientAppEnhanceFiles) {
        hooks.clientAppEnhanceFiles.add({
          pluginName,
          hook: normalizeClientFilesHook(clientAppEnhanceFiles),
        })
      }

      if (clientAppRootComponentFiles) {
        hooks.clientAppRootComponentFiles.add({
          pluginName,
          hook: normalizeClientFilesHook(clientAppRootComponentFiles),
        })
      }

      if (clientAppSetupFiles) {
        hooks.clientAppSetupFiles.add({
          pluginName,
          hook: normalizeClientFilesHook(clientAppSetupFiles),
        })
      }

      /**
       * common hooks
       */
      Object.entries(commonHooks).forEach(([key, hook]) => {
        if (hooks[key] && hook) {
          hooks[key].add({
            pluginName,
            hook,
          })
        }
      })
    }
  )
}
