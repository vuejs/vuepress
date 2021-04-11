import type { DocSearchProps } from '@docsearch/react'
import type { Plugin, PluginObject } from '@vuepress/core'
import type { LocaleConfig } from '@vuepress/shared'
import { logger, path } from '@vuepress/utils'

export type DocsearchPluginLocaleData = Pick<
  DocSearchProps,
  | 'appId'
  | 'apiKey'
  | 'indexName'
  | 'placeholder'
  | 'searchParameters'
  | 'disableUserPersonalization'
  | 'initialQuery'
>

export interface DocsearchPluginOptions extends DocsearchPluginLocaleData {
  locales?: LocaleConfig<DocsearchPluginLocaleData>
}

export const docsearchPlugin: Plugin<DocsearchPluginOptions> = ({
  locales = {},
  ...props
}) => {
  const plugin: PluginObject = {
    name: '@vuepress/plugin-docsearch',
  }

  // if the required options are not set
  // print warning and return a noop plugin
  if (!props.apiKey || !props.indexName) {
    logger.warn(`[${plugin.name}] 'apiKey' and 'indexName' are required`)
    return plugin
  }

  return {
    ...plugin,

    clientAppEnhanceFiles: path.resolve(
      __dirname,
      '../client/clientAppEnhance.js'
    ),

    define: {
      __DOCSEARCH_PROPS__: props,
      __DOCSEARCH_LOCALES__: locales,
    },
  }
}
