import { Option, OptionsNormalized, createOption } from './options'

export type PluginApiOptions = {
  [K in keyof OptionsNormalized]: Option<K>
}

export const createPluginApiOptions = (): PluginApiOptions => {
  const options: PluginApiOptions = {
    // webpack config
    alias: createOption(),
    define: createOption(),
    chainWebpack: createOption(),

    // dev server
    beforeDevServer: createOption(),
    afterDevServer: createOption(),

    // markdown
    extendMarkdown: createOption(),
    chainMarkdown: createOption(),

    // files
    clientDynamicModules: createOption({ applyInParallel: true }),

    // life cycle hooks
    onInitialized: createOption(),
    onPrepared: createOption(),
    onUpdated: createOption(),
    onGenerated: createOption(),
  }

  return options
}
