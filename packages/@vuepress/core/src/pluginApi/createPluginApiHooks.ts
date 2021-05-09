import type { PluginApi } from '../types'
import { createHookQueue } from './createHookQueue'

export const createPluginApiHooks = (): PluginApi['hooks'] => ({
  // life cycle hooks
  onInitialized: createHookQueue('onInitialized'),
  onPrepared: createHookQueue('onPrepared'),
  onWatched: createHookQueue('onWatched'),
  onGenerated: createHookQueue('onGenerated'),

  // page hooks
  extendsPageOptions: createHookQueue('extendsPageOptions'),
  extendsPageData: createHookQueue('extendsPageData'),

  // markdown hooks
  extendsMarkdown: createHookQueue('extendsMarkdown'),

  // client files hooks
  clientAppEnhanceFiles: createHookQueue('clientAppEnhanceFiles'),
  clientAppRootComponentFiles: createHookQueue('clientAppRootComponentFiles'),
  clientAppSetupFiles: createHookQueue('clientAppSetupFiles'),

  // bundler hooks
  alias: createHookQueue('alias'),
  define: createHookQueue('define'),
})
