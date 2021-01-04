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
  // aliases
  config.resolve.alias
    .set('@source', app.dir.source())
    .set('@temp', app.dir.temp())
    .set('@internal', app.dir.temp('internal'))

  // extensions
  config.resolve.extensions.merge([
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.vue',
    '.json',
  ])

  // plugin hook: alias
  const aliasResult = app.pluginApi.hooks.alias.processSync(app)

  // set aliases
  aliasResult.forEach((aliasObject) =>
    Object.entries(aliasObject).forEach(([key, value]) => {
      config.resolve.alias.set(key, value)
    })
  )
}
