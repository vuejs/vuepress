import type { Plugin } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import type { App } from '@vuepress/core'
import { removeLeadingSlash } from '@vuepress/shared'
import { fs } from '@vuepress/utils'
import type { ViteBundlerOptions } from '../types'
import { createWorkaroundPlugin } from './createWorkaroundPlugin'
import { resolveAlias } from './resolveAlias'
import { resolveDefine } from './resolveDefine'

// packages that include client code, which should not
// be optimized nor externalized
const clientPackages = [
  '@vuepress/client',
  '@vuepress/plugin-active-header-links',
  '@vuepress/plugin-back-to-top',
  '@vuepress/plugin-container',
  '@vuepress/plugin-debug',
  '@vuepress/plugin-docsearch',
  '@vuepress/plugin-git',
  '@vuepress/plugin-google-analytics',
  '@vuepress/plugin-medium-zoom',
  '@vuepress/plugin-nprogress',
  '@vuepress/plugin-palette',
  '@vuepress/plugin-prismjs',
  '@vuepress/plugin-pwa',
  '@vuepress/plugin-pwa-popup',
  '@vuepress/plugin-register-components',
  '@vuepress/plugin-search',
  '@vuepress/plugin-shiki',
  '@vuepress/plugin-theme-data',
  '@vuepress/plugin-toc',
  '@vuepress/theme-default',
  '@vuepress/theme-vue',
]

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
      define: resolveDefine({ app, isServer }),
      publicDir: app.dir.public(),
      cacheDir: app.dir.cache(),
      resolve: {
        alias: resolveAlias({ app }),
      },
      server: {
        host: app.options.host,
        port: app.options.port,
        open: app.options.open,
      },
      build: {
        ssr: isServer,
        outDir: isServer ? app.dir.dest('.server') : app.dir.dest(),
        cssCodeSplit: false,
        // TODO: may need to add this polyfill
        polyfillDynamicImport: false,
        rollupOptions: {
          input: app.dir.client('lib/app.js'),
          preserveEntrySignatures: 'allow-extension',
        },
        minify: isServer ? false : !app.env.isDebug,
      },
      optimizeDeps: {
        include: ['@vuepress/shared'],
        exclude: clientPackages,
      },
      ssr: {
        noExternal: clientPackages,
      },
    }),

    async configureServer(server) {
      // here we need to import vite client script explicitly because we do not
      // have the `index.html` file as a normal vite app
      const viteClient = `${app.options.base}@vite/client`

      // resolve the url path of the client entry file
      // use `removeLeadingSlash` to compat with windows file path
      const clientEntry = `${app.options.base}@fs/${removeLeadingSlash(
        app.dir.client('lib/app.js')
      )}`

      // resolve the module of client entry to get the timestamp
      const clientEntryModule = await server.moduleGraph.ensureEntryFromUrl(
        clientEntry
      )

      return () => {
        server.middlewares.use((req, res, next) => {
          if (req.url!.endsWith('.html')) {
            res.statusCode = 200

            // load dev template file
            const template = fs.readFileSync(app.options.templateDev).toString()

            // inject timestamp to client entry
            const clientEntrySrc =
              clientEntryModule.lastHMRTimestamp > 0
                ? `${clientEntry}?t=${clientEntryModule.lastHMRTimestamp}`
                : clientEntry

            // inject client entry to dev template
            res.end(
              template.replace(
                /<\/body>/,
                `${[
                  `<script type="module" src="${viteClient}"></script>`,
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
