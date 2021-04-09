import type { Plugin } from '@vuepress/core'
import { path, withSpinner } from '@vuepress/utils'
import type { GenerateSWConfig } from 'workbox-build'
import { generateServiceWorker } from './generateServiceWorker'

/**
 * Options for @vuepress/plugin-pwa
 */
export interface PwaPluginOptions
  extends Omit<GenerateSWConfig, 'swDest' | 'globDirectory'> {
  /**
   * Filename of the generated service worker file
   *
   * If you put it into a sub directory, the `scope` of service worker
   * might be affected
   *
   * @default 'service-worker.js'
   */
  serviceWorkerFilename?: string
}

export const pwaPlugin: Plugin<PwaPluginOptions> = ({
  serviceWorkerFilename = 'service-worker.js',
  ...generateSWConfig
}) => ({
  name: '@vuepress/plugin-pwa',

  clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

  define: {
    __PWA_SW_FILENAME__: serviceWorkerFilename,
  },

  onGenerated: (app) =>
    withSpinner('Generating service worker')(() =>
      generateServiceWorker(app, serviceWorkerFilename, generateSWConfig)
    ),
})
