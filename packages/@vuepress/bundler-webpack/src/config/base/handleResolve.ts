import * as Config from 'webpack-chain'
import { App } from '@vuepress/core'

/**
 * Set webpack resolve
 */
export const handleResolve = (config: Config, app: App): void => {
  config.resolve.alias
    // alias
    .set('@temp', app.dir.temp())
    .set('@internal', app.dir.temp('internal'))
    .end()
    // extensions
    // TODO: whether to resolve ts, styl by default or not
    .extensions.merge(['.js', '.jsx', '.ts', '.tsx', '.vue', '.json', '.styl'])
    .end()
}
