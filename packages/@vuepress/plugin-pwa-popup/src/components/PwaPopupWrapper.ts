import { h } from 'vue'
import type { FunctionalComponent } from 'vue'
import { PwaPopup } from './PwaPopup'
import type { PwaPopupLocales } from './PwaPopup'

declare const __DEV__: boolean
declare const __SSR__: boolean
declare const __PWA_POPUP_LOCALES__: PwaPopupLocales

const locales = __PWA_POPUP_LOCALES__

export const PwaPopupWrapper: FunctionalComponent = () => {
  if (__DEV__ || __SSR__) return null

  return h(PwaPopup, {
    locales,
  })
}

PwaPopupWrapper.displayName = 'PwaPopupWrapper'

export default PwaPopupWrapper
