import { defineClientAppSetup } from '@vuepress/client'
import { useNprogress } from './composables'

export default defineClientAppSetup(() => {
  useNprogress()
})
