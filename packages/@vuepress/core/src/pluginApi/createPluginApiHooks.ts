import type { PluginApi } from '../types'
import { createHookQueue } from './createHookQueue'

export const createPluginApiHooks = (): PluginApi['hooks'] => ({
  // life cycle hooks
  onInitialized: createHookQueue('onInitialized'),
  onPrepared: createHookQueue('onPrepared'),
  onWatched: createHookQueue('onWatched'),
  onGenerated: createHookQueue('onGenerated'),

  // page hooks
  extendsPageData: createHookQueue('extendsPageData'),

  // markdown hooks
  extendsMarkdown: createHookQueue('extendsMarkdown'),

  // client files hooks
  clientAppEnhanceFiles: createHookQueue('clientAppEnhanceFiles', true),
  clientAppRootComponentFiles: createHookQueue(
    'clientAppRootComponentFiles',
    true
  ),
  clientAppSetupFiles: createHookQueue('clientAppSetupFiles', true),

  // bundler hooks
  alias: createHookQueue('alias'),
  define: createHookQueue('define'),
})
