import type { ClientAppEnhance } from '@vuepress/client'
import Badge from './components/global/Badge.vue'
import CodeGroup from './components/global/CodeGroup.vue'
import CodeGroupItem from './components/global/CodeGroupItem.vue'
import OutboundLink from './components/global/OutboundLink.vue'

import './styles/index.styl'

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  /* eslint-disable vue/match-component-file-name */
  app.component('Badge', Badge)
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)
  app.component('OutboundLink', OutboundLink)
  /* eslint-enable vue/match-component-file-name */
}

export default clientAppEnhance
