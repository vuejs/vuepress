import type { ClientAppEnhance } from '@vuepress/client'
import Badge from './components/global/Badge.vue'
import CodeGroup from './components/global/CodeGroup.vue'
import CodeGroupItem from './components/global/CodeGroupItem.vue'
import OutboundLink from './components/global/OutboundLink.vue'

import './styles/index.scss'

declare const DOCSEARCH_PROPS: unknown

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  /* eslint-disable vue/match-component-file-name */
  app.component('Badge', Badge)
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)

  // unregister the built-in `<OutboundLink>` to avoid warning
  delete app._context.components.OutboundLink
  // override the built-in `<OutboundLink>`
  app.component('OutboundLink', OutboundLink)

  // docsearch feature might not be commonly used, so we don't put it
  // into dependencies of default theme, but it is supported
  if (typeof DOCSEARCH_PROPS === 'undefined') {
    // register a mock `<Docsearch>` if docsearch plugin is not enabled
    app.component('Docsearch', () => null)
  }
  /* eslint-enable vue/match-component-file-name */
}

export default clientAppEnhance
