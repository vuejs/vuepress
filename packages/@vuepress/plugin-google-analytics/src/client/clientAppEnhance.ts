import { defineClientAppEnhance } from '@vuepress/client'
import { useGoogleAnalytics } from './composables'

declare const __DEV__: boolean
declare const __SSR__: boolean
declare const GA_ID: string

const id = GA_ID

export default defineClientAppEnhance(() => {
  if (__DEV__ || __SSR__ || !id) return

  useGoogleAnalytics(id)
})
