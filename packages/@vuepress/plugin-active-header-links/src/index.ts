import { resolve } from 'path'
import type { Plugin } from '@vuepress/core'

export interface ActiveHeaderLinksPluginOptions {
  headerLinkSelector?: string
  headerAnchorSelector?: string
  delay?: number
}

export const activeHeaderLinksPlugin: Plugin<ActiveHeaderLinksPluginOptions> = ({
  headerLinkSelector = '.sidebar-link',
  headerAnchorSelector = '.header-anchor',
  delay = 200,
}) => ({
  name: '@vuepress/plugin-active-header-links',

  clientAppSetupFiles: resolve(__dirname, './clientAppSetup.js'),

  define: {
    AHL_HEADER_LINK_SELECTOR: headerLinkSelector,
    AHL_HEADER_ANCHOR_SELECTOR: headerAnchorSelector,
    AHL_DELAY: delay,
  },
})

export default activeHeaderLinksPlugin
