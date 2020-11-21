import type { ClientAppSetup } from '@vuepress/client'
import { useActiveHeaderLinks } from './composables'

declare const AHL_HEADER_LINK_SELECTOR: string
declare const AHL_HEADER_ANCHOR_SELECTOR: string
declare const AHL_DELAY: number

const clientAppSetup: ClientAppSetup = () => {
  useActiveHeaderLinks({
    headerLinkSelector: AHL_HEADER_LINK_SELECTOR,
    headerAnchorSelector: AHL_HEADER_ANCHOR_SELECTOR,
    delay: AHL_DELAY,
  })
}

export default clientAppSetup
