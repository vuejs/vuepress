import type { ClientAppEnhance } from '@vuepress/client'
import { useGoogleAnalytics } from './composables'

declare const __DEV__: boolean
declare const __SSR__: boolean
declare const GA_ID: string

const clientAppEnhance: ClientAppEnhance = ({ router }) => {
  if (__DEV__ || __SSR__ || !GA_ID) return

  useGoogleAnalytics({
    id: GA_ID,
    router,
  })
}

export default clientAppEnhance
