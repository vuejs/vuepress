import type { Plugin } from '@vuepress/core'
import { path } from '@vuepress/utils'

export interface ActiveHeaderLinksPluginOptions {
  headerLinkSelector?: string
  headerAnchorSelector?: string
  delay?: number
  offset?: number
}

export const activeHeaderLinksPlugin: Plugin<ActiveHeaderLinksPluginOptions> = ({
  headerLinkSelector = '.sidebar-link',
  headerAnchorSelector = '.header-anchor',
  delay = 200,
  offset = 5,
}) => ({
  name: '@vuepress/plugin-active-header-links',

  clientAppSetupFiles: path.resolve(__dirname, '../client/clientAppSetup.js'),

  define: {
    __AHL_HEADER_LINK_SELECTOR__: headerLinkSelector,
    __AHL_HEADER_ANCHOR_SELECTOR__: headerAnchorSelector,
    __AHL_DELAY__: delay,
    __AHL_OFFSET__: offset,
  },
})
