import { PluginApiOptions } from './createPluginApiOptions'
import { PluginApiPlugins } from './createPluginApiPlugins'
import {
  normalizeOptionAlias,
  normalizeOptionClientDynamicModules,
  normalizeOptionDefine,
} from './options'

export type PluginApiRegisterOptions = () => void

export const createPluginApiRegisterOptions = (
  plugins: PluginApiPlugins,
  options: PluginApiOptions
): PluginApiRegisterOptions => {
  const registerOptions: PluginApiRegisterOptions = () => {
    plugins.forEach(
      ({
        name: pluginName,

        alias,
        define,
        clientDynamicModules,

        ...opts
      }) => {
        /**
         * custom options
         */

        if (alias) {
          options.alias.add({
            pluginName,
            value: normalizeOptionAlias(alias),
          })
        }

        if (define) {
          options.define.add({
            pluginName,
            value: normalizeOptionDefine(define),
          })
        }

        if (clientDynamicModules) {
          options.clientDynamicModules.add({
            pluginName,
            value: normalizeOptionClientDynamicModules(
              clientDynamicModules,
              pluginName
            ),
          })
        }

        /**
         * common options
         */

        Object.entries(opts).forEach(([key, value]) => {
          if (options[key]) {
            options[key].add({
              pluginName,
              value,
            })
          }
        })
      }
    )
  }

  return registerOptions
}
