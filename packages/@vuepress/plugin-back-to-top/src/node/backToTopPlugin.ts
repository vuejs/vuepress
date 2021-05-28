import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type BackToTopPluginOptions = Record<never, never>

export const backToTopPlugin: Plugin<BackToTopPluginOptions> = (_, app) => {
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          exclude: ['ts-debounce'],
        },
      }
    )
  }

  return {
    name: '@vuepress/plugin-back-to-top',

    clientAppRootComponentFiles: path.resolve(
      __dirname,
      '../client/components/BackToTop.js'
    ),
  }
}
