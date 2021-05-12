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
      // although the issue was closed in vite 2.3.0, there are still
      // some problems with the version hash and we need to keep the
      // workaround for now
      if (server?._optimizeDepsMetadata?.browserHash) {
        server._optimizeDepsMetadata.browserHash = ''
      }
      return null
    },
  }
}
