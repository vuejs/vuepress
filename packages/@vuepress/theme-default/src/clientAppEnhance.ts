import type { ClientAppEnhance } from '@vuepress/client'
import CodeGroup from './components/global/CodeGroup.vue'
import CodeGroupItem from './components/global/CodeGroupItem.vue'

import './styles/index.styl'

const clientAppEnhance: ClientAppEnhance = ({ app }) => {
  /* eslint-disable vue/match-component-file-name */
  app.component('CodeGroup', CodeGroup)
  app.component('CodeGroupItem', CodeGroupItem)
  /* eslint-enable vue/match-component-file-name */
}

export default clientAppEnhance
