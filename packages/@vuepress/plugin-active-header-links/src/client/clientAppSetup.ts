import { defineClientAppSetup } from '@vuepress/client'
import { useActiveHeaderLinks } from './composables'

declare const __SSR__: boolean
declare const AHL_HEADER_LINK_SELECTOR: string
declare const AHL_HEADER_ANCHOR_SELECTOR: string
declare const AHL_DELAY: number
declare const AHL_OFFSET: number

export default defineClientAppSetup(() => {
  if (__SSR__) return

  useActiveHeaderLinks({
    headerLinkSelector: AHL_HEADER_LINK_SELECTOR,
    headerAnchorSelector: AHL_HEADER_ANCHOR_SELECTOR,
    delay: AHL_DELAY,
    offset: AHL_OFFSET,
  })
})
