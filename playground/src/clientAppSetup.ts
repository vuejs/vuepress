import { onMounted } from 'vue'
import type { ClientAppSetup } from '@vuepress/client'

const clientAppSetup: ClientAppSetup = () => {
  onMounted(() => {
    console.log('client app onMounted')
  })
  console.log('client app setup')
}

export default clientAppSetup
