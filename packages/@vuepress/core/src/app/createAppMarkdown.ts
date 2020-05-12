import * as createMarkdown from '@vuepress/markdown'
import { App } from './createApp'

// TODO
export type AppMarkdown = any

/**
 * Create markdown parser for vuepress app
 */
export const createAppMarkdown = (app: App): AppMarkdown => {
  const markdown: AppMarkdown = createMarkdown({
    // TODO: use markdown config from app.options
    beforeInstantiate: (config) => {
      app.pluginApi.applyOption('chainMarkdown', config)
    },
    afterInstantiate: (md) => {
      app.pluginApi.applyOption('extendMarkdown', md)
    },
  })

  return markdown
}
