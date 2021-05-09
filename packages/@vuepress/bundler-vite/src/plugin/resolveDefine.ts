import type { UserConfig } from 'vite'
import type { App } from '@vuepress/core'

export const resolveDefine = async ({
  app,
  isServer,
}: {
  app: App
  isServer: boolean
}): Promise<UserConfig['define']> => {
  const define: UserConfig['define'] = {
    __VERSION__: JSON.stringify(app.version),
    __DEV__: JSON.stringify(app.env.isDev),
    __SSR__: JSON.stringify(isServer),
    // @see http://link.vuejs.org/feature-flags
    // enable options API by default
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  }

  // plugin hook: define
  const defineResult = await app.pluginApi.hooks.define.process(app)

  defineResult.forEach((defineObject) =>
    Object.entries(defineObject).forEach(([key, value]) => {
      define[key] = JSON.stringify(value)
    })
  )

  return define
}
