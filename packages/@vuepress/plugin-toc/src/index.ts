import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'
import type { TocPropsOptions } from './types'

export interface TocPluginOptions {
  componentName: string
  defaultPropsOptions: TocPropsOptions
}

export const tocPlugin: Plugin<TocPluginOptions> = ({
  componentName = 'Toc',
  defaultPropsOptions = {},
}) => ({
  name: '@vuepress/plugin-toc',

  clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.js'),

  define: {
    TOC_COMPONENT_NAME: componentName,
    TOC_DEFAULT_PROPS_OPTIONS: defaultPropsOptions,
  },
})

export default tocPlugin
