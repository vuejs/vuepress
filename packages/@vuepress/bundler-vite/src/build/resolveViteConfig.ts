import { mergeConfig, InlineConfig } from 'vite'
import type { App } from '@vuepress/core'
import { createPlugin } from '../plugin'
import type { ViteBundlerOptions } from '../types'

export const resolveViteConfig = ({
  app,
  options,
  isServer,
}: {
  app: App
  options: ViteBundlerOptions
  isServer: boolean
}): InlineConfig =>
  mergeConfig(
    {
      configFile: false,
      logLevel: app.env.isDebug ? 'info' : 'warn',
      build: {
        ssr: isServer,
        outDir: isServer ? app.dir.dest('.server') : app.dir.dest(),
        cssCodeSplit: false,
        polyfillDynamicImport: false,
        rollupOptions: {
          input: app.dir.client('lib/app.js'),
          preserveEntrySignatures: 'allow-extension',
        },
        minify: isServer ? false : !app.env.isDebug,
      },
      plugins: [createPlugin({ app, options, isServer, isBuild: true })],
    },
    options.viteOptions ?? {}
  )
