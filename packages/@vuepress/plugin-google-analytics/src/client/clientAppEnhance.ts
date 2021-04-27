import { defineClientAppEnhance } from '@vuepress/client'
import { useGoogleAnalytics } from './composables'

declare const __GA_ID__: string

const id = __GA_ID__

export default defineClientAppEnhance(() => {
  if (__SSR__) return

  useGoogleAnalytics(id)
})
