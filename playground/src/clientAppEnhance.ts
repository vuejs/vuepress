import type { ClientAppEnhance } from '@vuepress/client'

const clientAppEnhance: ClientAppEnhance = ({ app, router, siteData }) => {
  console.log('hello from clientAppEnhance')
}

export default clientAppEnhance
