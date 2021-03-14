import type { Plugin, ViteDevServer, DepOptimizationMetadata } from 'vite'

export const createWorkaroundPlugin = (): Plugin => {
  let server:
    | (ViteDevServer & { _optimizeDepsMetadata?: DepOptimizationMetadata })
    | null
  return {
    name: 'vuepress:workaround',
    enforce: 'pre',
    configureServer(_server) {
      server = _server
    },
    resolveId() {
      // workaround for https://github.com/vitejs/vite/issues/2503
      if (server?._optimizeDepsMetadata?.browserHash) {
        server._optimizeDepsMetadata.browserHash = ''
      }
      return null
    },
  }
}
