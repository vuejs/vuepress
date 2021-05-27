import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { DocsearchOptions } from '../shared'

export type DocsearchPluginOptions = DocsearchOptions

export const docsearchPlugin: Plugin<DocsearchPluginOptions> = (
  options,
  app
) => {
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          exclude: ['@docsearch/js', 'preact'],
        },
      }
    )
  }

  return {
    name: '@vuepress/plugin-docsearch',

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    define: {
      __DOCSEARCH_OPTIONS__: options,
    },
  }
}
