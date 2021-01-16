import type { ContainerPluginOptions } from '@vuepress/plugin-container'
import type { DefaultThemeOptions } from '../types'

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For custom containers default title
 */
export const resolveContainerPluginOptions = (
  options: DefaultThemeOptions,
  type: 'tip' | 'warning' | 'danger'
): ContainerPluginOptions | boolean => {
  if (options.themePlugins?.container?.[type] === false) {
    return false
  }

  const locales = Object.entries(options.locales || {}).reduce(
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

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For details container
 */
export const resolveContainerPluginOptionsForDetails = (
  options: DefaultThemeOptions
): ContainerPluginOptions | boolean => {
  if (options.themePlugins?.container?.details === false) {
    return false
  }

  return {
    type: 'details',
    before: (info) =>
      `<details class="custom-container details">${
        info ? `<summary>${info}</summary>` : ''
      }\n`,
    after: () => '</details>\n',
  }
}

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For code-group container
 */
export const resolveContainerPluginOptionsForCodeGroup = (
  options: DefaultThemeOptions
): ContainerPluginOptions | boolean => {
  if (options.themePlugins?.container?.codeGroup === false) {
    return false
  }

  return {
    type: 'code-group',
    before: () => `<CodeGroup>\n`,
    after: () => '</CodeGroup>\n',
  }
}

/**
 * Resolve options for @vuepress/plugin-container
 *
 * For code-group-item block
 */
export const resolveContainerPluginOptionsForCodeGroupItem = (
  options: DefaultThemeOptions
): ContainerPluginOptions | boolean => {
  if (options.themePlugins?.container?.codeGroupItem === false) {
    return false
  }

  return {
    type: 'code-group-item',
    before: (info) => `<CodeGroupItem title="${info}">\n`,
    after: () => '</CodeGroupItem>\n',
  }
}
