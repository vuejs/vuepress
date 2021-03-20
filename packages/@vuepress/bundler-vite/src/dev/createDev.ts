import { createServer, mergeConfig } from 'vite'
import type { App, Bundler } from '@vuepress/core'
import { createPlugin } from '../plugin'
import type { ViteBundlerOptions } from '../types'

export const createDev = (
  options: ViteBundlerOptions
): Bundler['dev'] => async (app: App) => {
  const server = await createServer(
    mergeConfig(
      {
        configFile: false,
        server: {
          host: app.options.host,
          port: app.options.port,
          open: app.options.open,
        },
        plugins: [
          createPlugin({
            app,
            options,
            isServer: false,
            isBuild: false,
          }),
        ],
      },
      options.viteOptions ?? {}
    )
  )

  await server.listen()

  return server.close.bind(server)
}
