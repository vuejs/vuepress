import type { ZoomOptions } from 'medium-zoom'
import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export interface MediumZoomPluginOptions {
  selector: string
  zoomOptions?: ZoomOptions
  delay?: number
}

export const mediumZoomPlugin: Plugin<MediumZoomPluginOptions> = (
  { selector = ':not(a) > img', zoomOptions = {}, delay = 500 },
  app
) => {
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          exclude: ['medium-zoom'],
        },
      }
    )
  }

  return {
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
  }
}

export default mediumZoomPlugin
