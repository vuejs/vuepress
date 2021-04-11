import type { ZoomOptions } from 'medium-zoom'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export interface MediumZoomPluginOptions {
  selector: string
  zoomOptions?: ZoomOptions
  delay?: number
}

export const mediumZoomPlugin: Plugin<MediumZoomPluginOptions> = ({
  selector = ':not(a) > img',
  zoomOptions = {},
  delay = 500,
}) => ({
  name: '@vuepress/plugin-medium-zoom',

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    '../client/clientAppEnhance.js'
  ),

  define: {
    __MZ_SELECTOR__: selector,
    __MZ_ZOOM_OPTIONS__: zoomOptions,
    __MZ_DELAY__: delay,
  },
})

export default mediumZoomPlugin
