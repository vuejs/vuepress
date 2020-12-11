import type { Plugin } from '@vuepress/core'
import { logger, path, withSpinner } from '@vuepress/utils'
import type {
  generateSW as GenerateSWFunc,
  GenerateSWConfig,
} from 'workbox-build'

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

const assetsExtensions = [
  // basic
  'html',
  'js',
  'css',
  // images
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
  // fonts
  'woff',
  'woff2',
  'eot',
  'tff',
  'otf',
]

export const pwaPlugin: Plugin<PwaPluginOptions> = ({
  serviceWorkerFilename = 'service-worker.js',
  ...generateSWConfig
}) => ({
  name: '@vuepress/plugin-pwa',

  clientAppSetupFiles: path.resolve(__dirname, './clientAppSetup.js'),

  define: {
    __PWA_SW_FILENAME__: serviceWorkerFilename,
  },

  async onGenerated(app) {
    await withSpinner('Generating service worker')(async () => {
      // lazy-load workbox-build
      const generateSW: typeof GenerateSWFunc = require('workbox-build/build/generate-sw')

      const globDirectory = app.dir.dest()
      const swDest = app.dir.dest(serviceWorkerFilename)

      const { warnings } = await generateSW({
        dontCacheBustURLsMatching: new RegExp(
          `\\.[0-9a-f]{8}\\.(${assetsExtensions.join('|')})$`
        ),
        globPatterns: [`**/*.{${assetsExtensions.join(',')}}`],
        mode: app.env.isDebug ? 'development' : 'production',
        sourcemap: app.env.isDebug,
        ...generateSWConfig,
        // should not be override by user config
        globDirectory,
        swDest,
      })

      warnings.forEach((warning) =>
        logger.warn('[@vuepress/plugin-pwa]', warning)
      )
    })
  },
})

export default pwaPlugin
