import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type NprogressPluginOptions = Record<never, never>

export const nprogressPlugin: Plugin<NprogressPluginOptions> = {
  name: '@vuepress/plugin-nprogress',

  clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

  onInitialized(app) {
    if (app.options.bundler.endsWith('vite')) {
      app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
        app.options.bundlerConfig.viteOptions,
        {
          optimizeDeps: {
            include: ['nprogress'],
          },
        }
      )
    }
  },
}
