import { resolve } from 'path'
import type { DocSearchProps } from '@docsearch/react'
import type { Plugin, PluginObject } from '@vuepress/core'
import type { LocaleConfig } from '@vuepress/shared'
import { logger } from '@vuepress/utils'

export interface DocsearchPluginOptions
  extends Pick<
    DocSearchProps,
    | 'appId'
    | 'apiKey'
    | 'indexName'
    | 'searchParameters'
    | 'disableUserPersonalization'
    | 'initialQuery'
  > {
  locales?: LocaleConfig<Pick<DocSearchProps, 'placeholder'>>
}

export const docsearchPlugin: Plugin<DocsearchPluginOptions> = ({
  locales,
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

    clientAppEnhanceFiles: resolve(__dirname, './clientAppEnhance.js'),

    define: {
      DOCSEARCH_PROPS: props,
      DOCSEARCH_LOCALES: locales,
    },
  }
}

export default docsearchPlugin
