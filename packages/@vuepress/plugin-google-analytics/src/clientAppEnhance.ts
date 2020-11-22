import type { ClientAppEnhance } from '@vuepress/client'
import { useGoogleAnalytics } from './composables'

declare const __DEV__: boolean
declare const __SSR__: boolean
declare const GA_ID: string

const id = GA_ID

const clientAppEnhance: ClientAppEnhance = ({ router }) => {
  if (__DEV__ || __SSR__ || !id) return

  useGoogleAnalytics({
    id,
    router,
  })
}

export default clientAppEnhance
