import type { TransformOptions } from '@babel/core'
import type { App } from '@vuepress/core'
import type { CacheLoaderOptions } from './resolveCacheLoaderOptions'

/**
 * @see https://babeljs.io/docs/en/options
 */
export type BabelLoaderOptions = TransformOptions & CacheLoaderOptions

export const resolveBabelLoaderOptions = ({
  app,
  cacheLoaderOptions,
}: {
  app: App
  cacheLoaderOptions: CacheLoaderOptions
}): BabelLoaderOptions => {
  return {
    // do not pick local project babel config (.babelrc)
    babelrc: false,

    // do not pick local project babel config (babel.config.js)
    configFile: false,

    presets: [
      [
        // use @vue/babel-preset-app, which is mainly for vue-cli projects
        // so we may need some extra options
        require.resolve('@vue/babel-preset-app'),
        {
          // TODO: determine if we need to set this option in test
          // modules: app.env.isTest ? 'commonjs' : false,

          // if `evergreen: true`, do not add polyfills automatically so set this option to `false`
          // if `evergreen: false` (default), add polyfills automatically so set this options to `'usage'`
          useBuiltIns: app.options.evergreen ? false : 'usage',

          // enable jsx feature
          jsx: true,

          // ensure polyfills are injected into entry files
          // only client entry is required
          entryFiles: [app.dir.client('lib/client.js')],
        },
      ],
    ],

    // here we use babel-loader with caching instead of cache-loader + babel-loader
    // @see https://github.com/babel/babel-loader/issues/525
    ...cacheLoaderOptions,
  }
}
