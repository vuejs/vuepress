import type * as Config from 'webpack-chain'
import type { App } from '@vuepress/core'

/**
 * Set webpack resolve
 */
export const handleResolve = ({
  app,
  config,
}: {
  app: App
  config: Config
}): void => {
  config.resolve.alias
    // alias
    .set('@temp', app.dir.temp())
    .set('@internal', app.dir.temp('internal'))
    .end()
    // extensions
    .extensions.merge(['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'])
    .end()

  // plugin hook: alias
  const aliasResult = app.pluginApi.hooks.alias.processSync()

  // set aliases
  aliasResult.forEach((aliasObject) =>
    Object.entries(aliasObject).forEach(([key, value]) => {
      config.resolve.alias.set(key, value)
    })
  )
}
