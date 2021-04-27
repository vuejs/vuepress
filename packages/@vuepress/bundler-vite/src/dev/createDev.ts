import { createServer, mergeConfig } from 'vite'
import type { App, Bundler } from '@vuepress/core'
import { createPlugin } from '../plugin'
import type { ViteBundlerOptions } from '../types'

export const createDev = (
  options: ViteBundlerOptions
): Bundler['dev'] => async (app: App) => {
  const viteConfig = mergeConfig(
    {
      configFile: false,
      plugins: [
        createPlugin({
          app,
          options,
          isServer: false,
          isBuild: false,
        }),
      ],
      // `clearScreen` won't take effect in `config` hook of plugin API
      clearScreen: false,
    },
    options.viteOptions ?? {}
  )

  const server = await createServer(viteConfig)

  await server.listen()

  return server.close.bind(server)
}
