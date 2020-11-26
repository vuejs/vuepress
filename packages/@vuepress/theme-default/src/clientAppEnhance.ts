import type { ClientAppEnhance } from '@vuepress/client'
import Badge from './components/global/Badge.vue'
import CodeGroup from './components/global/CodeGroup.vue'
import CodeGroupItem from './components/global/CodeGroupItem.vue'
import OutboundLink from './components/global/OutboundLink.vue'

import './styles/index.styl'

declare const __THEME_DEFAULT_DOCSEARCH__: boolean

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  /* eslint-disable vue/match-component-file-name */
  app.component('Badge', Badge)
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)

  // unregister the built-in `<OutboundLink>` to avoid warning
  delete app._context.components.OutboundLink
  // override the built-in `<OutboundLink>`
  app.component('OutboundLink', OutboundLink)

  // register a mock `<Docsearch>` if docsearch plugin is not enabled
  if (!__THEME_DEFAULT_DOCSEARCH__) {
    app.component('Docsearch', () => null)
  }
  /* eslint-enable vue/match-component-file-name */
}

export default clientAppEnhance
