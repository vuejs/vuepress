import { DefinePlugin } from 'webpack'
import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack DefinePlugin
 */
export const handlePluginDefine = async ({
  app,
  config,
  isServer,
}: {
  app: App
  config: Config
  isServer: boolean
}): Promise<void> => {
  // define plugin
  config.plugin('define').use(DefinePlugin, [
    {
      'process.env.NODE_ENV': JSON.stringify(app.env.nodeEnv),
      '__VERSION__': JSON.stringify(app.version),
      '__DEV__': JSON.stringify(app.env.isDev),
      '__SSR__': JSON.stringify(isServer),
      // @see http://link.vuejs.org/feature-flags
      // enable options API by default
      '__VUE_OPTIONS_API__': JSON.stringify(true),
      '__VUE_PROD_DEVTOOLS__': JSON.stringify(false),
    },
  ])

  // plugin hook: define
  const defineResult = await app.pluginApi.hooks.define.process(app)

  // tap the arguments of DefinePlugin
  config.plugin('define').tap(([options]) => {
    defineResult.forEach((defineObject) =>
      Object.entries(defineObject).forEach(([key, value]) => {
        options[key] = JSON.stringify(value)
      })
    )

    return [options]
  })
}
