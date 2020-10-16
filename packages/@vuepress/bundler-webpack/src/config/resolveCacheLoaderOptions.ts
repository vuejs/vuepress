import type { App } from '@vuepress/core'

/**
 * Only partial of the options that will be used internally
 *
 * @see https://www.npmjs.com/package/cache-loader#options
 */
export interface CacheLoaderOptions {
  cacheDirectory?: string
  cacheIdentifier?: string
}

export const resolveCacheLoaderOptions = ({
  app,
  identifier,
}: {
  app: App
  identifier?: Record<string, string | boolean>
}): CacheLoaderOptions => {
  const cacheDirectory = app.options.cache
  const cacheIdentifier = JSON.stringify({
    ...identifier,
    'isDebug': app.env.isDebug,
    'isProd': app.env.isProd,
    'vuepress': app.version,
    'cache-loader': require('cache-loader/package.json').version,
    // TODO: determine what else should be used as cache key
  })

  return {
    cacheDirectory,
    cacheIdentifier,
  }
}
