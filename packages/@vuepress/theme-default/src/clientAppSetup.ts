import { provide } from 'vue'
import type { ClientAppSetup } from '@vuepress/client'
import { resolveSidebarItems, sidebarItemsSymbol } from './composables'

const clientAppSetup: ClientAppSetup = () => {
  // we need to access sidebar items in multiple components
  // so we make it global computed
  const sidebarItems = resolveSidebarItems()
  provide(sidebarItemsSymbol, sidebarItems)
}

export default clientAppSetup
