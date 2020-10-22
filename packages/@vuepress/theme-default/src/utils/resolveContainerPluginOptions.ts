import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import type { DefaultThemeOptions } from '../../types'

/**
 * Resolve locale config for @vuepress/plugin-container
 *
 * For custom blocks default title
 */
export const resolveContainerPluginOptions = (
  themeLocales: Required<DefaultThemeOptions>['locales'],
  type: 'tip' | 'warning' | 'danger',
  defaultLocales: Required<ContainerPluginOptions>['locales']
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
    defaultLocales
  )

  return {
    type,
    locales,
  }
}
