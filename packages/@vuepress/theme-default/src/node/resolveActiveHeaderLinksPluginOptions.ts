import type { ActiveHeaderLinksPluginOptions } from '@vuepress/plugin-active-header-links'
import type { DefaultThemeOptions } from '../types'

/**
 * Resolve options for @vuepress/plugin-active-header-links
 */
export const resolveActiveHeaderLinksPluginOptions = (
  options: DefaultThemeOptions
): ActiveHeaderLinksPluginOptions | boolean => {
  if (options.themePlugins?.activeHeaderLinks === false) {
    return false
  }

  return {
    headerLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor',
  }
}
