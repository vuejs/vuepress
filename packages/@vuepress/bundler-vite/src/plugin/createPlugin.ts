import type { Plugin } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import { removeLeadingSlash } from '@vuepress/shared'
import { fs } from '@vuepress/utils'
import type { ViteBundlerOptions } from '../types'
import { createWorkaroundPlugin } from './createWorkaroundPlugin'
import { resolveAlias } from './resolveAlias'
import { resolveDefine } from './resolveDefine'

export const createPlugin = ({
  app,
  options,
  isServer,
  isBuild,
}: {
  app: App
  options: ViteBundlerOptions
  isServer: boolean
  isBuild: boolean
}): Plugin[] => [
  createVuePlugin(options.vuePluginOptions),
  createWorkaroundPlugin(),
  {
    name: 'vuepress',

    config: () => ({
      root: app.dir.source(),
      base: app.options.base,
      mode: isBuild ? 'production' : 'development',
      publicDir: app.dir.public(),
      cacheDir: app.dir.cache(),
      define: resolveDefine({ app, isServer }),
      resolve: {
        alias: resolveAlias({ app }),
      },
      optimizeDeps: {
        include: ['@vuepress/shared'],
        exclude: ['@vuepress/client'],
      },
    }),

    configureServer(server) {
      return () => {
        // inject client entry-point to dev template
        server.middlewares.use((req, res, next) => {
          if (req.url!.endsWith('.html')) {
            res.statusCode = 200
            const template = fs.readFileSync(app.options.templateDev).toString()
            const clientEntrySrc = `/@fs/${removeLeadingSlash(
              app.dir.client('lib/client.js')
            )}`
            res.end(
              template.replace(
                /<\/body>/,
                `${[
                  `<script type="module" src="/@vite/client"></script>`,
                  `<script type="module" src="${clientEntrySrc}"></script>`,
                ].join('')}</body>`
              )
            )
            return
          }
          next()
        })
      }
    },
  },
]
