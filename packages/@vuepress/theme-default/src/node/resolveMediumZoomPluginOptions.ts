import type { MediumZoomPluginOptions } from '@vuepress/plugin-medium-zoom'
import type { DefaultThemePluginsOptions } from '../types'

/**
 * Resolve options for @vuepress/plugin-medium-zoom
 */
export const resolveMediumZoomPluginOptions = (
  themePlugins: DefaultThemePluginsOptions
): MediumZoomPluginOptions | boolean => {
  if (themePlugins?.mediumZoom === false) {
    return false
  }

  return {
    selector: '.theme-default-content :not(a) > img',
    zoomOptions: {},
    delay: 300,
  }
}
