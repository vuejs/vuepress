import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export type NprogressPluginOptions = Record<never, never>

export const nprogressPlugin: Plugin<NprogressPluginOptions> = (_, app) => {
  if (app.env.isDev && app.options.bundler.endsWith('vite')) {
    // eslint-disable-next-line import/no-extraneous-dependencies
    app.options.bundlerConfig.viteOptions = require('vite').mergeConfig(
      app.options.bundlerConfig.viteOptions,
      {
        optimizeDeps: {
          include: ['nprogress'],
        },
      }
    )
  }

  return {
    name: '@vuepress/plugin-nprogress',

    clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),
  }
}
