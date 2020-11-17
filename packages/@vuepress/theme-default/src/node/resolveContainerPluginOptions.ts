import type { ContainerPluginOptions } from '@vuepress/plugin-container/lib/types'
import type { DefaultThemeOptions } from '../types'

/**
 * Resolve locale config for @vuepress/plugin-container
 *
 * For custom blocks default title
 */
export const resolveContainerPluginOptions = (
  themeLocales: DefaultThemeOptions['locales'] = {},
  type: 'tip' | 'warning' | 'danger'
): ContainerPluginOptions => {
  const locales = Object.entries(themeLocales).reduce(
    (result, [key, value]) => {
      const defaultInfo = value?.[type]
      if (defaultInfo) {
        result[key] = {
          defaultInfo,
        }
      }
      return result
    },
    {}
  )

  return {
    type,
    locales,
  }
}
