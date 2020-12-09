import type { ZoomOptions } from 'medium-zoom'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export interface MediumZoomPluginOptions {
  selector: string
  options?: ZoomOptions
  delay?: number
}

export const mediumZoomPlugin: Plugin<MediumZoomPluginOptions> = ({
  selector = ':not(a) > img',
  options = {},
  delay = 500,
}) => ({
  name: '@vuepress/plugin-medium-zoom',

  clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

  define: {
    MZ_SELECTOR: selector,
    MZ_OPTIONS: options,
    MZ_DELAY: delay,
  },
})

export default mediumZoomPlugin
