import type { PluginApi } from '../types'
import { createHookQueue } from './createHookQueue'

export const createPluginApiHooks = (): PluginApi['hooks'] => ({
  // life cycle hooks
  onInitialized: createHookQueue('onInitialized'),
  onPrepared: createHookQueue('onPrepared'),
  onUpdated: createHookQueue('onUpdated'),
  onGenerated: createHookQueue('onGenerated'),

  // markdown hooks
  extendsMarkdown: createHookQueue('extendsMarkdown'),

  // client files hooks
  clientAppEnhanceFiles: createHookQueue('clientAppEnhanceFiles', true),
  clientAppSetupFiles: createHookQueue('clientAppSetupFiles', true),

  // bundler hooks
  alias: createHookQueue('alias'),
  define: createHookQueue('define'),

  // webpack hooks
  chainWebpack: createHookQueue('chainWebpack'),
  beforeDevServer: createHookQueue('beforeDevServer'),
  afterDevServer: createHookQueue('afterDevServer'),
})
