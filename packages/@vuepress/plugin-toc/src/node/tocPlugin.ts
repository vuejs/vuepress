import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { TocPropsOptions } from '../shared'

export interface TocPluginOptions {
  componentName: string
  defaultPropsOptions: TocPropsOptions
}

export const tocPlugin: Plugin<TocPluginOptions> = ({
  componentName = 'Toc',
  defaultPropsOptions = {},
}) => ({
  name: '@vuepress/plugin-toc',

  clientAppEnhanceFiles: path.resolve(
    __dirname,
    '../client/clientAppEnhance.js'
  ),

  define: {
    __TOC_COMPONENT_NAME__: componentName,
    __TOC_DEFAULT_PROPS_OPTIONS__: defaultPropsOptions,
  },
})
