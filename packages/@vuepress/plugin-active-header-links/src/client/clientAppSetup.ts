import { defineClientAppSetup } from '@vuepress/client'
import { useActiveHeaderLinks } from './composables'

declare const __AHL_HEADER_LINK_SELECTOR__: string
declare const __AHL_HEADER_ANCHOR_SELECTOR__: string
declare const __AHL_DELAY__: number
declare const __AHL_OFFSET__: number

const headerLinkSelector = __AHL_HEADER_LINK_SELECTOR__
const headerAnchorSelector = __AHL_HEADER_ANCHOR_SELECTOR__
const delay = __AHL_DELAY__
const offset = __AHL_OFFSET__

export default defineClientAppSetup(() => {
  if (__SSR__) return

  useActiveHeaderLinks({
    headerLinkSelector,
    headerAnchorSelector,
    delay,
    offset,
  })
})
