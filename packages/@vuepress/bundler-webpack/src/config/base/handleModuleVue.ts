import * as Config from 'webpack-chain'
import { VueLoaderPlugin } from 'vue-loader'
import { App } from '@vuepress/core'

const applyVuePipeline = (rule: Config.Rule): void => {
  // rule
  //   .use('cache-loader')
  //   .loader('cache-loader')
  //   .options({
  //     cacheDirectory,
  //     cacheIdentifier: finalCacheIdentifier,
  //   })

  rule
    .use('vue-loader')
    .loader('vue-loader')
    .options({
      compilerOptions: {
        preserveWhitespace: true,
      },
      // cacheDirectory,
      // cacheIdentifier: finalCacheIdentifier,
    })
}

/**
 * Set webpack module to handle vue files
 */
export const handleModuleVue = (config: Config, app: App): void => {
  // .vue files
  const vueRule = config.module.rule('vue').test(/\.vue$/)
  applyVuePipeline(vueRule)

  // .md files
  const mdRule = config.module.rule('markdown').test(/\.md$/)
  applyVuePipeline(mdRule)
  mdRule
    .use('markdown-loader')
    // TODO
    .loader(require.resolve('@vuepress/markdown-loader'))
    .options({
      sourceDir: app.dir.source(),
      // TODO
      // markdown: app.markdown,
    })

  // use vue-loader plugin
  config.plugin('vue-loader').use(VueLoaderPlugin)
}
