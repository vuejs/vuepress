import type { MediumZoomPluginOptions } from '@vuepress/plugin-medium-zoom'
import type { DefaultThemeOptions } from '../types'

/**
 * Resolve options for @vuepress/plugin-medium-zoom
 */
export const resolveMediumZoomPluginOptions = (
  options: DefaultThemeOptions
): MediumZoomPluginOptions | boolean => {
  if (options.themePlugins?.mediumZoom === false) {
    return false
  }

  return {
    selector: '.theme-default-content :not(a) > img',
    zoomOptions: {},
    delay: 300,
  }
}
