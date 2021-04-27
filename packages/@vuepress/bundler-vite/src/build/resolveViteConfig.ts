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
      plugins: [createPlugin({ app, options, isServer, isBuild: true })],
      // `logLevel` won't take effect in `config` hook of plugin API
      logLevel: app.env.isDebug ? 'info' : 'warn',
    },
    options.viteOptions ?? {}
  )
